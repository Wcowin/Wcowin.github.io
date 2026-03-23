/**
 * Cloudflare Worker - 硅基流动 API 代理
 * 保护 API Key，同时支持翻译和 Ask AI 功能
 */

// 允许访问的域名列表（你的博客域名）
const ALLOWED_ORIGINS = [
  'https://wcowin.work',
  'https://www.wcowin.work',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];

// 硅基流动 API 配置
const SILICONFLOW_API = {
  endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
  model: 'Qwen/Qwen3-8B'
};

// CORS 响应头
function getCorsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

// 验证请求来源
function isAllowedOrigin(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin === allowed || origin.endsWith(allowed.replace('https://', '.').replace('http://', '.')));
}

// 主处理函数
export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin');
    const url = new URL(request.url);

    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(origin)
      });
    }

    // 只允许 POST 请求
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin)
        }
      });
    }

    // 验证来源（可选，如果你希望公开访问可以注释掉）
    // if (!isAllowedOrigin(origin)) {
    //   return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
    //     status: 403,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       ...getCorsHeaders(origin)
    //     }
    //   });
    // }

    try {
      // 解析请求体
      const body = await request.json();
      const { messages, stream = false, temperature = 0.7, max_tokens = 4096 } = body;

      if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // 从环境变量获取 API Key
      const apiKey = env.SILICONFLOW_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API Key not configured' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // 调用硅基流动 API
      const response = await fetch(SILICONFLOW_API.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: SILICONFLOW_API.model,
          messages,
          temperature,
          max_tokens,
          stream
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('SiliconFlow API error:', response.status, errorText);
        return new Response(JSON.stringify({ 
          error: 'API request failed',
          status: response.status 
        }), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // 如果是流式响应，直接透传
      if (stream) {
        return new Response(response.body, {
          status: 200,
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            ...getCorsHeaders(origin)
          }
        });
      }

      // 非流式响应，解析后返回
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin)
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin)
        }
      });
    }
  }
};
