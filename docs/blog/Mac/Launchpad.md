<h1>重置 Launchpad 设置 </h1> 

出现以上问题只需要重置 Launchpad 设置：  

重置 Dock 图标数据库：在 Finder 中进入` ~/Library/Application Support/Dock/ `目录，删除该目录下的desktoppicture.db 文件。或者在 Terminal 中键入 `rm ~/Library/Application\ Support/Dock/*.db && killall Dock` 后回车。  

重置 Launchpad 图标数据库：在 Terminal 中键入 `defaults write com.apple.dock ResetLaunchPad -bool true && killall Dock `后回车。  
 
完成以上操作后，Launchpad 图标布局已经恢复默认设置，苹果官方提供的 App 都被重新排列到 Launchpad 第一屏幕中，然后根据自己的需要来进行重新排列 App 即可。