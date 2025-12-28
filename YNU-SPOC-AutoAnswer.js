// ==UserScript==
// @name         YNU-SPOC自动答题脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/HeLongaa/YNU-Tools/main/YNU-SPOC-AutoAnswer.js
// @description  SPOC课程单元测试自动答题助手，支持顺序答题，集成AI分析功能，无需缓存题库，适用于云南大学等使用SPOC平台的高校。
// @author       HeLong
// @match        https://www.icourse163.org/learn/*
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_addStyle
// @connect      api.siliconflow.cn
// @license      MIT
// @icon         data:image/png;base64,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
// ==/UserScript==

(function() {
    'use strict';

    // 配置AI接口
    const AI_CONFIG = {
        API_KEY: '',
        API_URL: 'https://api.siliconflow.cn/v1/chat/completions',
        MODEL: 'deepseek-ai/DeepSeek-V3',
        MAX_RETRIES: 3,
        RETRY_DELAY: 2000,
        SELECT_DELAY: 2000,
        OPTION_DELAY: 500 
    };

    // 添加样式
    GM_addStyle(`
        .auto-answer-btn {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        .auto-answer-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .auto-answer-btn:active {
            transform: translateY(0);
        }
        .auto-answer-btn.loading {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            cursor: not-allowed;
        }
        .auto-answer-btn.success {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .auto-answer-btn.error {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .answer-status {
            position: fixed;
            top: 160px;
            right: 20px;
            z-index: 9999;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            max-width: 300px;
            max-height: 400px;
            overflow-y: auto;
            display: none;
            font-family: Arial, sans-serif;
        }
        .status-header {
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #667eea;
            color: #333;
        }
        .status-item {
            margin: 8px 0;
            padding: 8px;
            border-radius: 5px;
            font-size: 12px;
            display: flex;
            align-items: center;
        }
        .status-icon {
            margin-right: 8px;
            font-size: 14px;
        }
        .status-correct .status-icon {
            color: #28a745;
        }
        .status-wrong .status-icon {
            color: #dc3545;
        }
        .status-processing .status-icon {
            color: #ffc107;
        }
        .status-text {
            flex: 1;
        }
        .status-correct {
            background-color: rgba(40, 167, 69, 0.1);
            color: #155724;
            border-left: 3px solid #28a745;
        }
        .status-wrong {
            background-color: rgba(220, 53, 69, 0.1);
            color: #721c24;
            border-left: 3px solid #dc3545;
        }
        .status-processing {
            background-color: rgba(255, 193, 7, 0.1);
            color: #856404;
            border-left: 3px solid #ffc107;
        }
        .current-question {
            background-color: rgba(0, 123, 255, 0.1) !important;
            border-left: 3px solid #007bff !important;
        }
        .progress-bar {
            width: 100%;
            height: 4px;
            background-color: #e9ecef;
            border-radius: 2px;
            margin: 10px 0;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            transition: width 0.3s ease;
        }
        .stats-info {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
            color: #6c757d;
        }
        .controls {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .control-btn {
            flex: 1;
            padding: 5px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
        }
        .control-btn-pause {
            background-color: #ffc107;
            color: #212529;
        }
        .control-btn-resume {
            background-color: #28a745;
            color: white;
        }
        .control-btn-stop {
            background-color: #dc3545;
            color: white;
        }
        .control-btn-skip {
            background-color: #6c757d;
            color: white;
        }
    `);

    class AutoAnswer {
        constructor() {
            this.questions = [];
            this.isProcessing = false;
            this.isPaused = false;
            this.currentQuestionIndex = 0;
            this.init();
        }

        init() {
            this.createUI();
            this.bindEvents();
        }

        createUI() {
            // 创建主按钮
            this.btn = document.createElement('button');
            this.btn.className = 'auto-answer-btn';
            this.btn.textContent = '自动答题';
            document.body.appendChild(this.btn);

            // 创建状态显示区域
            this.statusPanel = document.createElement('div');
            this.statusPanel.className = 'answer-status';
            this.statusPanel.innerHTML = `
                <div class="status-header">顺序答题进度</div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="status-list"></div>
                <div class="controls">
                    <button class="control-btn control-btn-pause">暂停</button>
                    <button class="control-btn control-btn-resume" style="display:none">继续</button>
                    <button class="control-btn control-btn-skip">跳过当前</button>
                    <button class="control-btn control-btn-stop">停止</button>
                </div>
                <div class="stats-info">准备开始...</div>
            `;
            document.body.appendChild(this.statusPanel);
        }

        bindEvents() {
            this.btn.addEventListener('click', () => this.startAutoAnswer());

            // 控制按钮事件
            this.statusPanel.querySelector('.control-btn-pause').addEventListener('click', () => this.pause());
            this.statusPanel.querySelector('.control-btn-resume').addEventListener('click', () => this.resume());
            this.statusPanel.querySelector('.control-btn-stop').addEventListener('click', () => this.stop());
            this.statusPanel.querySelector('.control-btn-skip').addEventListener('click', () => this.skipCurrent());
        }

        async startAutoAnswer() {
            if (this.isProcessing) return;

            this.isProcessing = true;
            this.isPaused = false;
            this.currentQuestionIndex = 0;
            this.btn.classList.add('loading');
            this.btn.textContent = '正在分析题目...';
            this.showStatusPanel();

            try {
                // 收集所有题目
                await this.collectQuestions();

                // 顺序处理每个题目
                await this.processQuestionsSequentially();

                if (!this.isPaused) {
                    this.showSuccess('所有题目处理完成！');
                }
            } catch (error) {
                this.showError('答题失败: ' + error.message);
            } finally {
                if (!this.isPaused) {
                    this.isProcessing = false;
                    this.btn.classList.remove('loading');
                    this.btn.textContent = '自动答题';
                }
            }
        }

        showStatusPanel() {
            this.statusPanel.style.display = 'block';
        }

        collectQuestions() {
            return new Promise((resolve) => {
                this.questions = [];

                // 查找所有题目
                const questionElements = document.querySelectorAll('.m-choiceQuestion');

                questionElements.forEach((questionEl, index) => {
                    const question = {
                        index: index + 1,
                        element: questionEl,
                        type: this.getQuestionType(questionEl),
                        text: this.getQuestionText(questionEl),
                        options: this.getQuestionOptions(questionEl),
                        hasDirectAnswer: this.hasDirectAnswer(questionEl),
                        processed: false,
                        answer: null,
                        source: null
                    };

                    this.questions.push(question);
                });

                console.log(`收集到 ${this.questions.length} 道题目`);
                this.updateProgress(0);
                this.updateStats(`找到 ${this.questions.length} 道题目`);
                resolve();
            });
        }

        hasDirectAnswer(questionEl) {
            const correctOption = questionEl.querySelector('.u-icon-correct');
            const wrongOption = questionEl.querySelector('.u-icon-wrong');
            return !!(correctOption || wrongOption);
        }

        getQuestionType(questionEl) {
            const cateEl = questionEl.querySelector('.qaCate');
            if (!cateEl) return 'unknown';

            const text = cateEl.textContent.toLowerCase();
            if (text.includes('单选')) return 'single';
            if (text.includes('多选')) return 'multiple';
            if (text.includes('判断')) return 'judge';
            return 'unknown';
        }

        getQuestionText(questionEl) {
            const textEl = questionEl.querySelector('.j-richTxt');
            return textEl ? textEl.textContent.trim().replace(/\s+/g, ' ') : '';
        }

        getQuestionOptions(questionEl) {
            const options = [];
            const optionEls = questionEl.querySelectorAll('.choices li');

            optionEls.forEach((optionEl, index) => {
                const textEl = optionEl.querySelector('.optionCnt');
                const option = {
                    index: index,
                    element: optionEl,
                    text: textEl ? textEl.textContent.trim() : '',
                    input: optionEl.querySelector('input[type="radio"], input[type="checkbox"]'),
                    isCorrect: this.isCorrectOption(optionEl)
                };
                options.push(option);
            });

            return options;
        }

        isCorrectOption(optionEl) {
            const correctIcon = optionEl.querySelector('.u-icon-correct');
            const wrongIcon = optionEl.querySelector('.u-icon-wrong');

            if (correctIcon) return true;
            if (wrongIcon) return false;
            return null;
        }

        async processQuestionsSequentially() {
            const statusList = this.statusPanel.querySelector('.status-list');
            statusList.innerHTML = '';

            for (let i = 0; i < this.questions.length; i++) {
                if (this.isPaused) {
                    await this.waitForResume();
                    if (!this.isProcessing) return;
                }

                this.currentQuestionIndex = i;
                const question = this.questions[i];

                // 更新进度
                const progress = ((i) / this.questions.length) * 100;
                this.updateProgress(progress);

                // 创建状态项
                const statusItem = this.createStatusItem(question.index, '等待处理...', 'processing');

                try {
                    // 处理当前题目
                    await this.processSingleQuestion(question, statusItem);

                    // 等待2秒再进行下一题
                    this.updateStats(`第${question.index}题处理完成，等待${AI_CONFIG.SELECT_DELAY/1000}秒...`);
                    await this.delay(AI_CONFIG.SELECT_DELAY);

                } catch (error) {
                    this.updateStatusItem(statusItem, `处理失败: ${error.message}`, 'wrong');
                    console.error(`第${question.index}题处理失败:`, error);
                }

                // 更新进度
                const newProgress = ((i + 1) / this.questions.length) * 100;
                this.updateProgress(newProgress);
                this.updateStats(`已完成: ${i + 1}/${this.questions.length}`);
            }

            this.updateProgress(100);
            this.updateStats('所有题目处理完成！');
        }

        async processSingleQuestion(question, statusItem) {
            // 标记为当前正在处理的题目
            statusItem.classList.add('current-question');

            this.updateStatusItem(statusItem, '正在分析题目...', 'processing');

            // 1. 尝试获取答案
            const answer = await this.getAnswerForQuestion(question);

            // 保存答案
            question.answer = answer.answer;
            question.source = answer.source;
            question.processed = true;

            this.updateStatusItem(statusItem, `答案: ${answer.answer} (${answer.source})`, 'processing');

            // 2. 选择答案
            this.updateStatusItem(statusItem, '正在选择答案...', 'processing');
            const selectionResult = await this.selectAnswerWithDetails(question, answer.answer, statusItem);

            if (selectionResult) {
                this.updateStatusItem(statusItem, `已选择: ${answer.answer}`, 'correct');
            } else {
                this.updateStatusItem(statusItem, `选择失败`, 'wrong');
            }

            // 移除当前题目标记
            statusItem.classList.remove('current-question');

            return selectionResult;
        }

        async getAnswerForQuestion(question, retryCount = 0) {
            // 优先使用直接答案
            if (question.hasDirectAnswer) {
                const directAnswer = this.getDirectAnswer(question);
                if (directAnswer) {
                    return {
                        answer: directAnswer,
                        source: '直接答案',
                        confidence: 1.0
                    };
                }
            }

            // 使用AI获取答案
            try {
                const answer = await this.queryAI(question);
                return {
                    answer: answer,
                    source: 'AI分析',
                    confidence: 0.9
                };
            } catch (error) {
                if (retryCount < AI_CONFIG.MAX_RETRIES) {
                    await this.delay(AI_CONFIG.RETRY_DELAY * (retryCount + 1));
                    return this.getAnswerForQuestion(question, retryCount + 1);
                } else {
                    throw new Error(`获取答案失败: ${error.message}`);
                }
            }
        }

        getDirectAnswer(question) {
            if (question.type === 'judge') {
                // 判断题直接找正确答案
                for (const option of question.options) {
                    if (option.isCorrect === true) {
                        return option.index === 0 ? 'A' : 'B';
                    }
                }
            } else {
                // 选择题
                const correctLetters = [];
                question.options.forEach((option, index) => {
                    if (option.isCorrect === true) {
                        correctLetters.push(String.fromCharCode(65 + index));
                    }
                });

                if (correctLetters.length > 0) {
                    return question.type === 'single' ? correctLetters[0] : correctLetters.sort().join('');
                }
            }
            return null;
        }

        queryAI(question) {
            return new Promise((resolve, reject) => {
                const prompt = this.buildPrompt(question);

                GM_xmlhttpRequest({
                    method: 'POST',
                    url: AI_CONFIG.API_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AI_CONFIG.API_KEY}`
                    },
                    data: JSON.stringify({
                        model: AI_CONFIG.MODEL,
                        messages: [
                            {
                                role: 'system',
                                content: '你是一个教育助手，专门帮助解答创业课程的测试题。请准确分析题目并给出正确答案。对于选择题，只返回选项字母（如A、B、AB等）。对于判断题，只返回"正确"或"错误"。不要解释，只要答案。'
                            },
                            {
                                role: 'user',
                                content: prompt
                            }
                        ],
                        temperature: 0.1,
                        max_tokens: 50
                    }),
                    timeout: 15000,
                    onload: (response) => {
                        if (response.status >= 200 && response.status < 300) {
                            try {
                                const data = JSON.parse(response.responseText);
                                const answer = data.choices[0].message.content.trim();
                                resolve(this.parseAIAnswer(answer, question.type));
                            } catch (error) {
                                reject(new Error('AI响应解析失败'));
                            }
                        } else {
                            reject(new Error(`HTTP ${response.status}`));
                        }
                    },
                    onerror: (error) => {
                        reject(new Error('网络请求失败'));
                    },
                    ontimeout: () => {
                        reject(new Error('请求超时'));
                    }
                });
            });
        }

        buildPrompt(question) {
            let prompt = `请分析以下创业课程测试题并给出正确答案：\n\n题目: ${question.text}\n`;

            if (question.type === 'judge') {
                prompt += `\n只需回答"正确"或"错误"：`;
            } else {
                prompt += `\n选项:\n`;
                question.options.forEach((option, index) => {
                    prompt += `${String.fromCharCode(65 + index)}. ${option.text}\n`;
                });

                if (question.type === 'single') {
                    prompt += `\n只需返回一个正确答案的字母（如A）：`;
                } else if (question.type === 'multiple') {
                    prompt += `\n只需返回所有正确答案的字母（如ABC，按字母顺序）：`;
                }
            }

            return prompt;
        }

        parseAIAnswer(answer, type) {
            // 清理答案
            const cleanAnswer = answer.replace(/[^A-D正确错误]/gi, '').trim();

            if (type === 'judge') {
                return cleanAnswer.includes('正确') ? 'A' : 'B';
            }

            // 提取字母
            const letters = cleanAnswer.match(/[A-D]/gi);
            if (!letters || letters.length === 0) return null;

            const uniqueLetters = [...new Set(letters.map(l => l.toUpperCase()))];
            return type === 'single' ? uniqueLetters[0] : uniqueLetters.sort().join('');
        }

        async selectAnswerWithDetails(question, answer, statusItem) {
            return new Promise(async (resolve) => {
                try {
                    let success = false;

                    if (question.type === 'judge') {
                        // 判断题
                        const isCorrect = answer === 'A';
                        const optionIndex = isCorrect ? 0 : 1;
                        const option = question.options[optionIndex];

                        if (option && option.input) {
                            option.input.click();
                            success = true;
                            this.updateStatusItem(statusItem, `已选择: ${isCorrect ? '正确' : '错误'}`, 'processing');
                        }
                    } else if (question.type === 'single') {
                        // 单选题
                        const answerLetter = answer;
                        const optionIndex = answerLetter.charCodeAt(0) - 65;

                        if (optionIndex >= 0 && optionIndex < question.options.length) {
                            const option = question.options[optionIndex];
                            if (option && option.input) {
                                option.input.click();
                                success = true;
                                this.updateStatusItem(statusItem, `已选择: ${answerLetter}`, 'processing');
                            }
                        }
                    } else if (question.type === 'multiple') {
                        // 多选题 - 逐个选择
                        const answerLetters = answer.split('');
                        let selectedCount = 0;

                        // 逐个选择每个选项
                        for (let i = 0; i < answerLetters.length; i++) {
                            if (this.isPaused) {
                                await this.waitForResume();
                                if (!this.isProcessing) {
                                    resolve(false);
                                    return;
                                }
                            }

                            const letter = answerLetters[i];
                            const optionIndex = letter.charCodeAt(0) - 65;

                            if (optionIndex >= 0 && optionIndex < question.options.length) {
                                const option = question.options[optionIndex];
                                if (option && option.input && !option.input.checked) {
                                    // 点击该选项
                                    option.input.click();
                                    selectedCount++;

                                    // 更新状态显示
                                    this.updateStatusItem(
                                        statusItem,
                                        `已选择 ${selectedCount}/${answerLetters.length}: ${answerLetters.slice(0, i+1).join('')}`,
                                        'processing'
                                    );

                                    // 每个选项之间等待
                                    if (i < answerLetters.length - 1) {
                                        await this.delay(AI_CONFIG.OPTION_DELAY);
                                    }
                                }
                            }
                        }

                        success = selectedCount > 0;
                    }

                    resolve(success);
                } catch (error) {
                    console.error(`选择答案失败:`, error);
                    resolve(false);
                }
            });
        }

        createStatusItem(questionIndex, message, type) {
            const statusList = this.statusPanel.querySelector('.status-list');
            const statusItem = document.createElement('div');
            statusItem.className = `status-item status-${type}`;
            statusItem.id = `status-item-${questionIndex}`;
            statusItem.innerHTML = `
                <span class="status-icon">${type === 'correct' ? '✓' : type === 'wrong' ? '✗' : '⏳'}</span>
                <span class="status-text">第${questionIndex}题: ${message}</span>
            `;
            statusList.appendChild(statusItem);

            // 滚动到底部
            statusList.scrollTop = statusList.scrollHeight;

            return statusItem;
        }

        updateStatusItem(statusItem, message, type) {
            if (!statusItem) return;

            statusItem.className = `status-item status-${type}`;
            const icon = statusItem.querySelector('.status-icon');
            const text = statusItem.querySelector('.status-text');

            icon.textContent = type === 'correct' ? '✓' : type === 'wrong' ? '✗' : '⏳';
            text.textContent = `第${statusItem.id.split('-')[2]}题: ${message}`;
        }

        pause() {
            this.isPaused = true;
            this.btn.textContent = '已暂停';
            this.statusPanel.querySelector('.control-btn-pause').style.display = 'none';
            this.statusPanel.querySelector('.control-btn-resume').style.display = 'block';
            this.updateStats('已暂停');
        }

        resume() {
            this.isPaused = false;
            this.btn.textContent = '继续答题...';
            this.statusPanel.querySelector('.control-btn-pause').style.display = 'block';
            this.statusPanel.querySelector('.control-btn-resume').style.display = 'none';
            this.updateStats('继续中...');
        }

        skipCurrent() {
            if (this.currentQuestionIndex < this.questions.length) {
                const question = this.questions[this.currentQuestionIndex];
                question.processed = true;
                question.answer = 'skipped';
                question.source = 'skipped';

                // 更新状态项
                const statusItem = document.getElementById(`status-item-${question.index}`);
                if (statusItem) {
                    this.updateStatusItem(statusItem, '已跳过', 'wrong');
                    statusItem.classList.remove('current-question');
                }

                this.updateStats(`已跳过第${question.index}题`);
            }
        }

        stop() {
            this.isProcessing = false;
            this.isPaused = false;
            this.btn.classList.remove('loading');
            this.btn.textContent = '自动答题';
            this.statusPanel.style.display = 'none';
        }

        async waitForResume() {
            while (this.isPaused && this.isProcessing) {
                await this.delay(1000);
            }
        }

        updateProgress(percent) {
            const progressFill = this.statusPanel.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${percent}%`;
            }
        }

        updateStats(text) {
            const statsInfo = this.statusPanel.querySelector('.stats-info');
            if (statsInfo) {
                statsInfo.textContent = text;
            }
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        showSuccess(message) {
            this.btn.classList.add('success');
            this.btn.textContent = message;
            setTimeout(() => {
                this.btn.classList.remove('success');
                this.btn.textContent = '自动答题';
            }, 3000);

            GM_notification({
                title: '答题完成',
                text: message,
                timeout: 3000
            });
        }

        showError(message) {
            this.btn.classList.add('error');
            this.btn.textContent = '出错了';
            setTimeout(() => {
                this.btn.classList.remove('error');
                this.btn.textContent = '自动答题';
            }, 3000);

            GM_notification({
                title: '答题失败',
                text: message,
                timeout: 3000
            });
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (document.querySelector('.m-choiceQuestion')) {
                new AutoAnswer();
                console.log('单题顺序答题助手已加载（无缓存版）');
            }
        }, 2000);
    });
})();