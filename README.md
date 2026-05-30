# 求职个人作品集网页

这是一个无构建依赖的静态作品集页面，可直接部署到 GitHub Pages，方向定位为游戏开发 / 技术美术 / 风格化画面。

## 如何替换内容

- 修改 `index.html` 中的「你的名字」、个人简介、项目描述、邮箱、微信和 GitHub 链接。
- 把自己的图片放入 `assets/`，并替换 HTML 中的图片路径：
  - `assets/hero-placeholder.svg`：首页主视觉占位
  - `assets/project-01.svg`、`assets/project-02.svg`、`assets/project-03.svg`：项目截图占位
  - `assets/video-poster.svg`：视频封面占位
- 把作品集视频命名为 `showreel.mp4` 放入 `assets/`，或把视频区域改成 B 站 / YouTube 链接。
- 把简历 PDF 命名为 `resume.pdf` 放入 `assets/`，下载按钮会自动指向它。
- 修改 `styles.css` 顶部的 CSS 变量可以快速调整卡其配色、描边粗细和整体气质。

## GitHub Pages 部署

1. 将本目录内容提交到 GitHub 仓库。
2. 打开仓库 `Settings` -> `Pages`。
3. `Source` 选择 `Deploy from a branch`。
4. `Branch` 选择 `main`，目录选择 `/root`。
5. 保存后等待 GitHub Pages 生成访问链接。

如果你想把页面放在仓库子目录中，也可以将 `Portfolio` 目录内容移动到仓库根目录，或在 Pages 设置中选择对应发布目录。
