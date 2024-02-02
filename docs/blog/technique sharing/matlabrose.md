---
title: 用Matlab画玫瑰百合花
tags:
  - 技术分享
---
![image.png](https://s2.loli.net/2024/02/02/BXhu8zVaOxU4WLt.png)

```matlab
function roseBouquet
figure('Units','normalized','Position',[.2,.1,.6,.7])
%曲面数据计算 ==============================================================
% 玫瑰部分 -----------------------------------------------------------------
[xr,tr]=meshgrid((0:24)./24,(0:0.5:575)./575.*20.*pi+4*pi);
pr=(pi/2)*exp(-tr./(8*pi));
cr=sin(15*tr)/150;
ur=1-(1-mod(3.6*tr,2*pi)./pi).^4./2+cr;
yr=2*(xr.^2-xr).^2.*sin(pr);
rr=ur.*(xr.*sin(pr)+yr.*cos(pr));
hr=ur.*(xr.*cos(pr)-yr.*sin(pr));
% 百合花部分 ---------------------------------------------------------------
rb=0:.01:1;
tb=linspace(0,2,151);
wb=rb'*((abs((1-mod(tb*5,2))))/2+.3);
xb=wb.*cospi(tb);
yb=wb.*sinpi(tb); 
zb=@(a)(-cospi(wb*a)+1).^.2;
Zb=zb(1.2);
g=@(i)i(:,1:30:151)/2;
%颜色映射表 ================================================================
colorList=[0.3300    0.3300    0.6900
    0.5300    0.4000    0.6800
    0.6800    0.4200    0.6300
    0.7800    0.4200    0.5700
    0.9100    0.4900    0.4700
    0.9600    0.7300    0.4400];
% colorList=[0.9176    0.7490    0.3765
%     0.9294    0.7725    0.4902
%     0.9333    0.7451    0.5961
%     0.8902    0.6980    0.5294
%     0.8784    0.6941    0.6235
%     0.9216    0.7412    0.7529
%     0.8588    0.6039    0.7686
%     0.8510    0.4706    0.6392
%     0.7608    0.2118    0.3569];
colorMapr=setColorByH(hr,colorList);
colorMapb=setColorByH(Zb,colorList.*.4+.6);
    function cMap=setColorByH(H,cList)
        X=(H-min(min(H)))./(max(max(H))-min(min(H)));
        xx=(0:size(cList,1)-1)./(size(cList,1)-1);
        y1=cList(:,1);y2=cList(:,2);y3=cList(:,3);
        cMap(:,:,1)=interp1(xx,y1,X,'linear');
        cMap(:,:,2)=interp1(xx,y2,X,'linear');
        cMap(:,:,3)=interp1(xx,y3,X,'linear');
    end
% 旋转函数预定义 ===========================================================
yaw_z=72*pi/180;
roll_x_1=pi/8;
roll_x_2=pi/9;
R_z_2=[cos(yaw_z)  , -sin(yaw_z)  , 0; sin(yaw_z)  , cos(yaw_z)  , 0; 0, 0, 1];
R_z_1=[cos(yaw_z/2), -sin(yaw_z/2), 0; sin(yaw_z/2), cos(yaw_z/2), 0; 0, 0, 1];
R_z_3=[cos(yaw_z/3), -sin(yaw_z/3), 0; sin(yaw_z/3), cos(yaw_z/3), 0; 0, 0, 1];
R_x_1=[1, 0, 0; 0, cos(roll_x_1), -sin(roll_x_1); 0, sin(roll_x_1), cos(roll_x_1)];
R_x_2=[1, 0, 0; 0, cos(roll_x_2), -sin(roll_x_2); 0, sin(roll_x_2), cos(roll_x_2)];
    function [nX,nY,nZ]=rotateXYZ(X,Y,Z,R)
        nX=zeros(size(X)); nY=zeros(size(Y)); nZ=zeros(size(Z));
        for i=1:size(X,1)
            for j=1:size(X,2)
                v=[X(i,j);Y(i,j);Z(i,j)];
                nv=R*v; nX(i,j)=nv(1); nY(i,j)=nv(2); nZ(i,j)=nv(3);
            end
        end
    end
% 绘制花杆函数预定义 ========================================================
    function drawStraw(X,Y,Z)
        [m,n]=find(Z==min(min(Z)));
        m=m(1);n=n(1);
        x1=X(m,n);y1=Y(m,n);z1=Z(m,n)+.03;
        xx=[x1,0,(x1.*cos(pi/3)-y1.*sin(pi/3))./3].';
        yy=[y1,0,(y1.*cos(pi/3)+x1.*sin(pi/3))./3].';
        zz=[z1,-.7,-1.5].';
        strawPnts=bezierCurve([xx,yy,zz],50);
        plot3(strawPnts(:,1),strawPnts(:,2),strawPnts(:,3),'Color',[88,130,126]./255,'LineWidth',2)
    end
% 贝塞尔函数 ---------------------------------------------------------------
    function pnts=bezierCurve(pnts,N)
        t=linspace(0,1,N);
        p=size(pnts,1)-1;
        coe1=factorial(p)./factorial(0:p)./factorial(p:-1:0);
        coe2=((t).^((0:p)')).*((1-t).^((p:-1:0)'));
        pnts=(pnts'*(coe1'.*coe2))';
    end
%曲面旋转及绘制 ============================================================
hold on
surface(rr.*cos(tr),rr.*sin(tr),hr+0.35,'EdgeAlpha',0.05,...
    'EdgeColor',[0 0 0],'FaceColor','interp','CData',colorMapr,'Tag','slandarer')
[nXr,nYr,nZr]=rotateXYZ(rr.*cos(tr),rr.*sin(tr),hr+0.35,R_x_1);
nYr=nYr-.4;
surface(nXr,nYr,nZr-.1,'EdgeAlpha',0.05,...
'EdgeColor',[0 0 0],'FaceColor','interp','CData',colorMapr)
drawStraw(nXr,nYr,nZr-.1)
for k=1:4
    [nXr,nYr,nZr]=rotateXYZ(nXr,nYr,nZr,R_z_2);
    surface(nXr,nYr,nZr-.1,'EdgeAlpha',0.05,...
    'EdgeColor',[0 0 0],'FaceColor','interp','CData',colorMapr)
    drawStraw(nXr,nYr,nZr-.1)
end   
% -------------------------------------------------------------------------
[nXb,nYb,nZb]=rotateXYZ(xb./2.5,yb./2.5,Zb./2.5+.32,R_x_2);
nYb=nYb-1.35;
for k=1:5
    [nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_2);
    surface(nXb,nYb,nZb,'EdgeColor','none','FaceColor','interp','CData',colorMapb)
    drawStraw(nXb,nYb,nZb)
end  
[nXb,nYb,nZb]=rotateXYZ(xb./2.5,yb./2.5,Zb./2.5+.32,R_x_2);
nYb=nYb-1.15;
[nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_1);
for k=1:5
    [nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_2);
    surface(nXb,nYb,nZb,'EdgeColor','none','FaceColor','interp','CData',colorMapb)
    drawStraw(nXb,nYb,nZb)
end
[nXb,nYb,nZb]=rotateXYZ(xb./2.5,yb./2.5,Zb./2.5+.32,R_x_2);
nYb=nYb-1.25;
[nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_3);
for k=1:5
    [nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_2);
    surface(nXb,nYb,nZb,'EdgeColor','none','FaceColor','interp','CData',colorMapb)
    drawStraw(nXb,nYb,nZb)
end  
[nXb,nYb,nZb]=rotateXYZ(xb./2.5,yb./2.5,Zb./2.5+.32,R_x_2);
nYb=nYb-1.25;
[nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_3);
[nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_3);
for k=1:5
    [nXb,nYb,nZb]=rotateXYZ(nXb,nYb,nZb,R_z_2);
    surface(nXb,nYb,nZb,'EdgeColor','none','FaceColor','interp','CData',colorMapb)
    drawStraw(nXb,nYb,nZb)
end  
%axes属性调整 ==============================================================
ax=gca;
ax.Position=[0,0,1,1];
grid on
ax.GridLineStyle='--';
ax.LineWidth=1.2;
ax.XColor=[1,1,1].*0.4;
ax.YColor=[1,1,1].*0.4;
ax.ZColor=[1,1,1].*0.4;
ax.DataAspectRatio=[1,1,1];
ax.DataAspectRatioMode='manual';
view(-15,35);
end
```