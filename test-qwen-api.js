// 测试 Qwen-Flash-Character API 接入

const testQwenAPI = async () => {
  console.log('🧪 测试 Qwen-Flash-Character API 接入...\n');

  const API_KEY = 'sk-7e5be9edec4d44738c27165d44fe7c72';
  const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

  const testCases = [
    {
      name: '基础对话能力',
      messages: [
        { role: 'system', content: '你是一个友好的客服人员，名叫小李。' },
        { role: 'user', content: '你好，请问你能帮我什么？' }
      ]
    },
    {
      name: '角色扮演能力',
      messages: [
        {
          role: 'system',
          content: `你是医疗行业的业务人员，正在和产品经理沟通需求。
你的语言风格是口语化的，偶尔会抱怨工作压力。你知道2个核心痛点和1个硬性技术约束，
但只有当用户提问足够具体时才会透露。`
        },
        { role: 'user', content: '最近工作怎么样？' }
      ]
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n📋 测试: ${testCase.name}`);
    console.log('─'.repeat(50));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen-flash-character',
          messages: testCase.messages,
          temperature: 0.9,
          max_tokens: 200
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices[0].message.content;
        const usage = data.usage;

        console.log('✅ API 调用成功！');
        console.log(`📝 回复内容: ${reply}`);
        console.log(`📊 Token 使用: 输入=${usage.prompt_tokens}, 输出=${usage.completion_tokens}, 总计=${usage.total_tokens}`);
      } else {
        const error = await response.text();
        console.log('❌ API 调用失败！');
        console.log(`状态码: ${response.status}`);
        console.log(`错误信息: ${error}`);
      }
    } catch (error) {
      console.log('❌ 请求异常！');
      console.log(`错误: ${error.message}`);
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log('✨ 测试完成！');
};

// 运行测试
testQwenAPI().catch(console.error);
