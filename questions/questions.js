const exam = {
    reading: {
        passages: [
            "这里是第一段阅读文章...",
            "这里是第二段阅读文章...",
            "这里是第三段阅读文章..."
        ],
        questions: [
            // 第一段阅读的5个问题
            {
                question: "阅读理解问题1（第一段）",
                options: ["选项A", "选项B", "选项C", "选项D"],
                correctAnswer: 1,
                explanation: "这是问题1的解释..."
            },
            // ... 添加剩下的4个问题
            // 第二段阅读的5个问题
            {
                question: "阅读理解问题6（第二段）",
                options: ["选项A", "选项B", "选项C", "选项D"],
                correctAnswer: 2,
                explanation: "这是问题6的解释..."
            },
            // ... 添加剩下的4个问题
            // 第三段阅读的5个问题
            {
                question: "阅读理解问题11（第三段）",
                options: ["选项A", "选项B", "选项C", "选项D"],
                correctAnswer: 0,
                explanation: "这是问题11的解释..."
            },
            // ... 添加剩下的4个问题
        ]
    },
    vocabularyAndStructure: [
        {
            question: "词汇与结构问题1",
            options: ["选项A", "选项B", "选项C", "选项D"],
            correctAnswer: 0,
            explanation: "这是词汇与结构问题1的解释..."
        },
        // ... 添加剩下的29个问题，总共30个
    ],
    identification: [
        {
            question: "辨识题问题1",
            options: ["选项A", "选项B", "选项C", "选项D"],
            correctAnswer: 2,
            explanation: "这是辨识题问题1的解释..."
        },
        // ... 添加剩下的9个问题，总共10个
    ],
    cloze: {
        passage: "这里是完形填空的文章...",
        questions: [
            {
                question: "空1",
                options: ["选项A", "选项B", "选项C", "选项D"],
                correctAnswer: 1,
                explanation: "这是完形填空问题1的解释..."
            },
            // ... 添加剩下的19个问题，总共20个
        ]
    },
    translation: {
        englishToChinese: [
            {
                question: "1. Translate this sentence to Chinese.",
                correctAnswer: "这是参考答案。",
                explanation: "这是英译汉问题1的解释..."
            },
            // ... 添加剩下的4个问题，总共5个
        ],
        chineseToEnglish: [
            {
                question: "6. 将这个句子翻译成英语。",
                correctAnswer: "This is the reference answer.",
                explanation: "这是汉译英问题1的解释..."
            },
            // ... 添加剩下的4个问题，总共5个
        ]
    }
};
