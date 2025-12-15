// ==UserScript==
// @name         答题助手 - 10.50.60.8
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  自动选择并填写答案，支持单选和多选
// @author       HeLong
// @match        http://10.50.60.8:8080/rt/*
// @grant        GM_addStyle
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    // 添加自定义样式
    GM_addStyle(`
        .auto-answer-highlight {
            background-color: #e8f5e9 !important;
            border: 2px solid #4caf50 !important;
            border-radius: 6px !important;
            padding: 5px !important;
            margin: 3px 0 !important;
        }
        .answer-tag {
            display: inline-block;
            background: #4caf50;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
            vertical-align: middle;
        }
        .auto-answer-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 99999;
            font-family: 'Microsoft YaHei', sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            max-width: 300px;
        }
        .auto-answer-notification h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
        }
        .auto-answer-notification p {
            margin: 5px 0;
            font-size: 13px;
        }
        .auto-answer-count {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2196f3;
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            z-index: 99998;
            font-size: 14px;
            font-weight: bold;
        }
    `);

    // 主函数
    function autoAnswer() {
        console.log('开始自动答题...');

        // 获取所有问题
        const questions = document.querySelectorAll('.quesswiper-con');
        let processedCount = 0;
        let errorCount = 0;

        questions.forEach((question, index) => {
            try {
                // 获取问题标题和标准答案
                const questionTitle = question.querySelector('.question-bt');
                if (!questionTitle) return;

                const standardAnswer = questionTitle.getAttribute('standardanswer');
                if (!standardAnswer) return;

                // 获取所有选项
                const options = question.querySelectorAll('li');
                if (!options.length) return;

                // 解析答案（支持多选如"ABD"）
                const answers = standardAnswer.split('');

                // 标记每个选项
                options.forEach(option => {
                    const span = option.querySelector('span');
                    if (!span) return;

                    const optionLetter = span.textContent.trim();
                    const isCorrect = answers.includes(optionLetter);

                    if (isCorrect) {
                        // 查找对应的input元素
                        const input = option.querySelector('input');
                        if (input) {
                            // 设置选中状态
                            input.checked = true;

                            // 触发事件确保页面状态更新
                            input.dispatchEvent(new Event('click', { bubbles: true }));
                            input.dispatchEvent(new Event('change', { bubbles: true }));

                            // 高亮显示正确选项
                            option.classList.add('auto-answer-highlight');
                        }
                    }

                    // 在选项后面添加标识（正确/错误）
                    const statusTag = document.createElement('span');
                    statusTag.className = 'answer-tag';
                    statusTag.textContent = isCorrect ? '✓' : '✗';
                    statusTag.style.background = isCorrect ? '#4caf50' : '#f44336';

                    if (!option.querySelector('.answer-tag')) {
                        option.appendChild(statusTag);
                    }
                });

                // 在问题标题后添加答案显示
                const answerDisplay = document.createElement('span');
                answerDisplay.className = 'answer-tag';
                answerDisplay.style.background = '#2196f3';
                answerDisplay.style.fontSize = '14px';
                answerDisplay.textContent = `正确答案: ${standardAnswer}`;

                if (!questionTitle.querySelector('.answer-tag')) {
                    questionTitle.appendChild(answerDisplay);
                }

                processedCount++;

            } catch (error) {
                console.error(`处理第 ${index + 1} 题时出错:`, error);
                errorCount++;
            }
        });

        // 显示统计结果
        showResults(processedCount, errorCount);

        // 添加操作计数显示
        addCounter(processedCount);

        return processedCount;
    }

    // 显示结果通知
    function showResults(success, errors) {
        const notification = document.createElement('div');
        notification.className = 'auto-answer-notification';
        notification.innerHTML = `
            <h4>✅ 答题助手</h4>
            <p>成功处理: ${success} 道题</p>
            <p>错误数量: ${errors} 道题</p>
            <p>页面匹配: ${document.querySelectorAll('.quesswiper-con').length} 道题</p>
            <p>操作时间: ${new Date().toLocaleTimeString()}</p>
        `;

        document.body.appendChild(notification);

        // 5秒后淡出
        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }

    // 添加计数显示
    function addCounter(count) {
        // 移除旧的计数器
        const oldCounter = document.querySelector('.auto-answer-count');
        if (oldCounter) oldCounter.remove();

        const counter = document.createElement('div');
        counter.className = 'auto-answer-count';
        counter.innerHTML = `
            <span>已选择: ${count} 题</span>
            <button id="redo-btn" style="margin-left: 10px; background: white; color: #2196f3; border: none; border-radius: 3px; padding: 3px 8px; cursor: pointer;">重做</button>
        `;

        document.body.appendChild(counter);

        // 添加重做按钮事件
        document.getElementById('redo-btn').addEventListener('click', function() {
            location.reload();
        });
    }

    // 添加手动执行按钮
    function addControlPanel() {
        const panel = document.createElement('div');
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            background: white;
            border: 2px solid #4caf50;
            border-radius: 10px;
            padding: 15px;
            z-index: 99997;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            min-width: 150px;
        `;

        panel.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #4caf50; font-size: 14px;">答题助手</h4>
            <button id="auto-answer-btn" style="width: 100%; padding: 8px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5px;">
                🚀 自动答题
            </button>
            <button id="show-answers-btn" style="width: 100%; padding: 8px; background: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 5px;">
                📋 显示答案
            </button>
            <button id="clear-btn" style="width: 100%; padding: 8px; background: #ff9800; color: white; border: none; border-radius: 5px; cursor: pointer;">
                🧹 清除标记
            </button>
        `;

        document.body.appendChild(panel);

        // 按钮事件绑定
        document.getElementById('auto-answer-btn').addEventListener('click', function() {
            autoAnswer();
            GM_notification({
                text: '已自动选择所有答案！',
                title: '答题助手',
                timeout: 3000
            });
        });

        document.getElementById('show-answers-btn').addEventListener('click', function() {
            const questions = document.querySelectorAll('.quesswiper-con');
            let answers = '';
            questions.forEach((q, i) => {
                const title = q.querySelector('.question-bt');
                if (title) {
                    const answer = title.getAttribute('standardanswer') || '无答案';
                    answers += `${i+1}. ${answer}\n`;
                }
            });

            const answerWindow = window.open('', '_blank');
            answerWindow.document.write(`
                <html>
                <head><title>题目答案</title>
                <style>body{font-family:'Microsoft YaHei';padding:20px;}</style>
                </head>
                <body>
                    <h2>题目答案列表</h2>
                    <pre style="font-size:14px;">${answers}</pre>
                    <button onclick="window.close()">关闭</button>
                </body>
                </html>
            `);
        });

        document.getElementById('clear-btn').addEventListener('click', function() {
            // 移除所有标记
            document.querySelectorAll('.auto-answer-highlight').forEach(el => {
                el.classList.remove('auto-answer-highlight');
                el.style.backgroundColor = '';
                el.style.border = '';
            });

            // 移除所有答案标签
            document.querySelectorAll('.answer-tag').forEach(el => el.remove());

            // 移除计数器
            const counter = document.querySelector('.auto-answer-count');
            if (counter) counter.remove();

            GM_notification({
                text: '已清除所有标记！',
                title: '答题助手',
                timeout: 3000
            });
        });
    }

    // 初始化
    function init() {
        console.log('答题助手已加载，等待页面准备就绪...');

        // 等待页面加载完成后执行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initMain, 500);
            });
        } else {
            setTimeout(initMain, 500);
        }
    }

    // 主初始化函数
    function initMain() {
        // 检查是否有题目存在
        const hasQuestions = document.querySelectorAll('.quesswiper-con').length > 0;

        if (hasQuestions) {
            console.log('检测到题目，正在准备自动答题...');
            addControlPanel();

            // 自动执行（可注释掉这行改为手动点击按钮执行）
            setTimeout(() => {
                autoAnswer();
            }, 1000);
        } else {
            console.log('未检测到题目，可能需要翻页或等待内容加载');

            // 添加一个监听器，当内容变化时重新检查
            const observer = new MutationObserver(function(mutations) {
                const nowHasQuestions = document.querySelectorAll('.quesswiper-con').length > 0;
                if (nowHasQuestions && !document.querySelector('#auto-answer-btn')) {
                    console.log('检测到新加载的题目');
                    addControlPanel();
                    setTimeout(() => {
                        autoAnswer();
                    }, 500);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // 启动脚本
    init();
})();