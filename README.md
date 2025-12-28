# YNU-Tools

> 云南大学常用自动化工具脚本集合

## 📋 目录

- [脚本列表](#脚本列表)
- [使用说明](#使用说明)
- [配置说明](#配置说明)
- [注意事项](#注意事项)

## 🛠️ 脚本列表

### 1. [YNU-评教脚本](YNU-Evaluate-teaching.js)
自动完成课程评教任务，提高评教效率。

[一键安装](https://openuserjs.org/scripts/HeLongaa/%E8%87%AA%E5%8A%A8%E8%AF%84%E6%95%99-YNU)

**功能特点：**
- 自动填写评教问卷
- 批量处理多门课程

---

### 2. [YNU-创新创业课程测试脚本](YNU-XinDaoYun-Test.js)
辅助完成新道云平台创新创业课程的在线测试。

[一键安装](https://openuserjs.org/scripts/HeLongaa/%E7%AD%94%E9%A2%98%E5%8A%A9%E6%89%8B-YNU-%E6%96%B0%E9%81%93%E4%BA%91)
**功能特点：**
- 自动化测试流程
- 支持新道云平台

---

### 3. [YNU-SPOC自动答题脚本](YNU-SPOC-AutoAnswer.js)
基于 AI 的 SPOC 平台自动答题工具。

[一键安装](https://openuserjs.org/scripts/HeLongaa/YNU-SPOC%E8%87%AA%E5%8A%A8%E7%AD%94%E9%A2%98%E8%84%9A%E6%9C%AC)

**功能特点：**
- AI 智能答题
- 支持多种题型

**⚠️ 特别说明：**
- 此脚本需要配置 AI 接口 Key 才能使用。
- 此脚本不支持缓存题库功能。
- 此脚本不支持期末考试答题，仅适用于单元测试。

## 📖 使用说明

### 基础用法

1. 安装 Tampermonkey 浏览器扩展[Tampermonkey 官网](https://www.tampermonkey.net/)
2. 安装脚本
3. 页面上出现脚本按钮，点击即可执行相应功能

### SPOC 自动答题脚本使用

该脚本需要额外的配置步骤，请参考下方 [配置说明](#配置说明)。
## ⚙️ 配置说明

### SPOC 自动答题 AI 配置

在使用 [YNU-SPOC自动答题脚本](YNU-SPOC-AutoAnswer.js) 前，需要配置 AI 接口参数：

```javascript
const AI_CONFIG = {
    API_KEY: '',          // 填入你的 API Key
    API_URL: 'https://api.siliconflow.cn/v1/chat/completions',
    MODEL: 'deepseek-ai/DeepSeek-V3',
    MAX_RETRIES: 3,       // 最大重试次数
    RETRY_DELAY: 2000,    // 重试延迟（毫秒）
    SELECT_DELAY: 2000,   // 选择延迟（毫秒）
    OPTION_DELAY: 500     // 选项延迟（毫秒）
};
```

### 获取 API Key

推荐使用 [SiliconFlow](https://siliconflow.cn/) 平台：

1. 访问 [SiliconFlow 官网](https://siliconflow.cn/)
2. 注册并登录账号
3. 在控制台获取免费的 API Key
4. 将 API Key 填入上述配置的 `API_KEY` 字段

### 模型选择建议

- **推荐模型**：`deepseek-ai/DeepSeek-V3` 或其他轻量级模型
- **注意**：如非必要，不建议使用深度思考的模型
- **可选**：使用带有知识库的接口以提高准确率

## ⚠️ 注意事项

1. **仅供学习交流使用**，请遵守学校相关规定
2. 使用脚本前请确保理解脚本功能，避免误操作
3. AI 答题脚本的准确率取决于所使用的模型，请酌情使用
4. 配置 API 时注意保护个人密钥，避免泄露
5. 建议在使用前先在测试环境验证脚本功能

## 📄 许可

本项目仅供学习和研究使用。

---

**温馨提示**：使用自动化工具时请保持理性，适度使用，注重学习本身。
