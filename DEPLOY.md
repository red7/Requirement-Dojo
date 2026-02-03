# Requirement Dojo - 发布到 Cloudflare Pages 指南

## 🚀 快速部署步骤

### 1. 创建 GitHub 仓库

访问 https://github.com/new 创建新仓库：
- Repository name: `requirement-dojo`
- Description: `需求道场 - AI 驱动的产品经理需求分析训练系统`
- Public 或 Private（都可以）
- **不要**勾选 "Add a README file"（我们已经有了）

### 2. 推送代码到 GitHub

```bash
# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/requirement-dojo.git

# 推送代码
git branch -M main
git push -u origin main
```

### 3. 连接 Cloudflare Pages

#### 3.1 登录 Cloudflare
访问 https://dash.cloudflare.com/

#### 3.2 创建 Pages 项目
1. 点击左侧 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**

#### 3.3 连接仓库
1. 选择 **GitHub**
2. 授权 Cloudflare 访问你的 GitHub
3. 选择 `requirement-dojo` 仓库
4. 点击 **Begin setup**

#### 3.4 配置构建设置
- **Project name**: `requirement-dojo`（或自定义）
- **Production branch**: `main`
- **Framework preset**: 选择 **Vite** 或 **None**
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`（默认）

点击 **Save and Deploy**

### 4. 配置环境变量

部署完成后：

1. 进入项目 **Settings** → **Environment variables**
2. 点击 **Add variable**
3. 添加以下变量：

```
Variable name: DEEPSEEK_API_KEY
Value: sk-your-api-key-here
Environment: Production
```

4. 同样添加到 **Preview** 环境（可选）
5. 点击 **Save**

### 5. 重新部署

环境变量配置后需要重新部署：

1. 进入 **Deployments** 标签
2. 找到最新的部署
3. 点击 **...** → **Retry deployment**

或者直接推送一个新的提交：
```bash
git commit --allow-empty -m "Trigger rebuild"
git push
```

### 6. 访问你的应用 🎉

部署成功后，你会得到一个 URL：
```
https://requirement-dojo.pages.dev
```

也可以绑定自定义域名（在 **Custom domains** 中设置）

---

## 🔧 自定义域名（可选）

### 1. 添加域名
1. 进入项目 **Custom domains** 标签
2. 点击 **Set up a domain**
3. 输入你的域名，例如：`dojo.yourdomain.com`
4. 按照提示在你的 DNS 提供商添加 CNAME 记录

### 2. DNS 配置示例
```
Type: CNAME
Name: dojo
Target: requirement-dojo.pages.dev
```

---

## 📊 监控和日志

### 查看部署状态
**Deployments** 标签可以看到：
- 部署历史
- 构建日志
- 部署时间

### 查看 Functions 日志
**Functions** 标签可以看到：
- API 调用日志
- 错误信息
- 性能指标

---

## 🔄 更新部署

每次推送到 `main` 分支，Cloudflare Pages 会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Update: your changes"
git push

# Cloudflare 会自动检测并部署
```

---

## 🌍 预览部署

推送到其他分支会创建预览部署：

```bash
git checkout -b feature/new-scenario
# 修改代码
git add .
git commit -m "Add new scenario"
git push -u origin feature/new-scenario

# Cloudflare 会自动创建预览 URL
# 例如：https://abc123.requirement-dojo.pages.dev
```

---

## 🔐 环境变量管理

### Production 环境
- 用于 `main` 分支的部署
- 生产环境的 API key

### Preview 环境
- 用于其他分支的预览部署
- 可以使用测试 API key

### 更新环境变量
1. Settings → Environment variables
2. 找到要更新的变量
3. 点击 **Edit**
4. 更新值并保存
5. **重新部署**以使更改生效

---

## 💰 成本

Cloudflare Pages **免费额度**：
- 100,000 次请求/天
- 500 次构建/月
- 无限带宽
- 全球 CDN

DeepSeek API：
- 约 ¥38/月（100 人/天使用）

**总成本：非常低！** 💚

---

## 🐛 常见问题

### 1. 部署失败：Build command not found
**解决**：检查 Build command 是否为 `npm run build`

### 2. 运行时错误：未配置 API Key
**解决**：检查环境变量是否正确配置并重新部署

### 3. Functions 超时
**解决**：Cloudflare Functions 有 50ms CPU 时间限制（免费版）

### 4. 网站打不开
**解决**：检查 Build output directory 是否为 `dist`

---

## 📞 获取帮助

- Cloudflare Docs: https://developers.cloudflare.com/pages/
- GitHub Issues: https://github.com/YOUR_USERNAME/requirement-dojo/issues

---

**完成部署后，分享你的 URL，让更多人体验需求道场！** 🚀
