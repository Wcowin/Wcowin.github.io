// 通过 class 设置不翻译的元素，如果要忽略多个，加多行即可
translate.ignore.class.push('md-select');
// 自定义术语库，纠正翻译结果（每行一个规则，前后用等号分割）
translate.nomenclature.append('chinese_simplified','english',`
快讯=Newsflash
`);

translate.language.setLocal('chinese_simplified'); // 设置本地语种（如果不设置，会自动识别当前网页的文本语种）
translate.setAutoDiscriminateLocalLanguage();   // 设置首次使用时自动识别语种进行切换
translate.selectLanguageTag.show = false;       // 不显示 select 语言选择框
translate.service.use('client.edge');           // 设置机器翻译服务通道
translate.execute();
