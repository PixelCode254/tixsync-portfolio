import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Cornelius Maina Nyaga's AI portfolio assistant. You help visitors learn about Cornelius:
- Full-Stack Developer: React, Next.js, TypeScript, Node.js, Python
- Cybersecurity Expert: Penetration Testing, SOC, Security Architecture
- Founder of TIXSYNC SOLUTIONS and TIXSYNC Media
- Based in Kenya, serving clients across Africa
- Skills: Full-Stack Development, Cybersecurity, Cloud Architecture, DevOps, System Administration

Be helpful, professional, and concise. Respond in the same language the user writes in. Guide visitors to the right sections. If they want to hire Cornelius, direct them to the contact form or tixsyncsolutions@gmail.com.`;

const REPLIES: Record<string, Record<string, string>> = {
  about: {
    en: "Cornelius Maina Nyaga is a Full-Stack Developer and Security Engineer based in Kenya. He's the founder of TIXSYNC SOLUTIONS and TIXSYNC Media, specializing in building secure, scalable systems. Check out the About section for more details!",
    es: "Cornelius Maina Nyaga es un Desarrollador Full-Stack e Ingeniero de Seguridad con sede en Kenia. Es fundador de TIXSYNC SOLUTIONS y TIXSYNC Media, especializado en construir sistemas seguros y escalables.",
    fr: "Cornelius Maina Nyaga est un Développeur Full-Stack et Ingénieur Sécurité basé au Kenya. Il est fondateur de TIXSYNC SOLUTIONS et TIXSYNC Media, spécialisé dans la construction de systèmes sécurisés et évolutifs.",
    de: "Cornelius Maina Nyaga ist Full-Stack-Entwickler und Sicherheitsingenieur in Kenia. Er ist Gründer von TIXSYNC SOLUTIONS und TIXSYNC Media, spezialisiert auf sichere, skalierbare Systeme.",
    ar: "كورنيليوس ماينا نياجا هو مطور Full-Stack ومهندس أمن مقيم في كينيا. مؤسس TIXSYNC SOLUTIONS وTIXSYNC Media، متخصص في بناء أنظمة آمنة وقابلة للتوسع.",
    zh: "Cornelius Maina Nyaga是一位全栈开发者和安全工程师，驻扎在肯尼亚。他是TIXSYNC SOLUTIONS和TIXSYNC Media的创始人，专注于构建安全、可扩展的系统。",
    ja: "Cornelius Maina Nyagaはケニアを拠点とするフルスタック開発者兼セキュリティエンジニアです。TIXSYNC SOLUTIONSとTIXSYNC Mediaの創設者で、セキュアでスケーラブルなシステム構ブルなシステム構築を専門としています。",
    ko: "Cornelius Maina Nyaga는 케나야에 기반한 풀스택 개발자이자 보안 엔지니어입니다. TIXSYNC SOLUTIONS와 TIXSYNC Media의 설립자로, 안전하고 확장 가능한 시스템 구축을 전문으로 합니다.",
    hi: "Cornelius Maina Nyaga केन्या में स्थित एक फुल-स्टैक डेवलपर और सिक्योरिटी इंजीनियर हैं। वे TIXSYNC SOLUTIONS और TIXSYNC Media के संस्थापक हैं, सुरक्षित और स्केलेबल सिस्टम बनाने में विशेषज्ञ।",
    ru: "Корнелиус Майна Ньяга —.full-stack разработчик и инженер безопасности из Кении. Основатель TIXSYNC SOLUTIONS и TIXSYNC Media, специализируется на создании безопасных и масштабируемых систем.",
  },
  skills: {
    en: "Cornelius is proficient in Full-Stack Development (React, Next.js, TypeScript, Node.js), Cybersecurity (Penetration Testing, SOC, Security Architecture), Cloud Architecture (AWS, Azure), DevOps, and System Administration.",
    es: "Cornelius es competente en Desarrollo Full-Stack (React, Next.js, TypeScript, Node.js), Ciberseguridad (Pruebas de Penetración, SOC, Arquitectura de Seguridad), Arquitectura Cloud (AWS, Azure), DevOps y Administración de Sistemas.",
    fr: "Cornelius maîtrise le Développement Full-Stack (React, Next.js, TypeScript, Node.js), la Cybersécurité (Tests de Pénétration, SOC, Architecture Sécurité), l'Architecture Cloud (AWS, Azure), le DevOps et l'Administration Système.",
    de: "Cornelius ist versiert in Full-Stack-Entwicklung (React, Next.js, TypeScript, Node.js), Cybersicherheit (Penetrationstests, SOC, Sicherheitsarchitektur), Cloud-Architektur (AWS, Azure), DevOps und Systemadministration.",
    ar: "Cornelius ماهر في تطوير Full-Stack (React, Next.js, TypeScript, Node.js) والأمن السيبراني (اختبارات الاختراق SOC هندسة الأمن) وهندسة السحابة (AWS, Azure) وDevOps وإدارة الأنظمة.",
    zh: "Cornelius精通全栈开发（React、Next.js、TypeScript、Node.js）、网络安全（渗透测试、SOC、安全架构）、云架构（AWS、Azure）、DevOps和系统管理。",
    ja: "Corneliusはフルスタック開発（React、Next.js、TypeScript、Node.js）、サイバーセキュリティ（ペネトレーションテスト、SOC、セキュリティアーキテクチャ）、クラウドアーキテクチャ（AWS、Azure）、DevOps、システム管理に精通しています。",
    ko: "Cornelius는 풀스택 개발(React, Next.js, TypeScript, Node.js), 사이버 보안(침투 테스트, SOC, 보안 아키텍처), 클라우드 아키텍처(AWS, Azure), DevOps, 시스템 관리에 능숙합니다.",
    hi: "Cornelius फुल-स्टैक डेवलपमेंट (React, Next.js, TypeScript, Node.js), साइबर सुरक्षा (पेनेट्रेशन टेस्टिंग, SOC, सिक्योरिटी आर्किटेक्चर), क्लाउड आर्किटेक्चर (AWS, Azure), DevOps और सिस्टम एडमिनिस्ट्रेशन में कुशल हैं।",
    ru: "Корнелиус владеет full-stack разработкой (React, Next.js, TypeScript, Node.js), кибербезопасностью (пентесты, SOC, архитектура безопасности), облачной архитектурой (AWS, Azure), DevOps и системным администрированием.",
  },
  projects: {
    en: "Cornelius has built various projects including enterprise web applications, security tools, and cloud infrastructure solutions. Check the Projects section of this portfolio for detailed showcases, or visit his GitHub for open-source contributions.",
    es: "Cornelius ha construido varios proyectos incluyendo aplicaciones web empresariales, herramientas de seguridad y soluciones de infraestructura en la nube. Consulta la sección de Proyectos.",
    fr: "Cornelius a réalisé divers projets incluant des applications web d'entreprise, des outils de sécurité et des solutions d'infrastructure cloud. Consultez la section Projets.",
    de: "Cornelius hat verschiedene Projekte realisiert, darunter Unternehmens-Webanwendungen, Sicherheitstools und Cloud-Infrastrukturlösungen. Siehe Projekt-Sektion.",
    ar: "بنى كورنيليوس مشاريع متنوعة تشمل تطبيقات الويب المؤسسية وأدوات الأمن وحلول البنية التحتية السحابية. تصفح قسم المشاريع.",
    zh: "Cornelius构建了各种项目，包括企业Web应用、安全工具和云基础设施解决方案。请查看作品集的项目部分。",
    ja: "CorneliusはエンタープライズWebアプリケーション、セキュリティツール、クラウドインフラソリューションなど、様々なプロジェクトを構築しています。プロジェクトセクションをご確認ください。",
    ko: "Cornelius는 기업용 웹 애플리케이션, 보안 도구, 클라우드 인프라 솔루션 등 다양한 프로젝트를 구축했습니다. 프로젝트 섹션을 확인해 주세요.",
    hi: "Cornelius ने विभिन्न प्रोजेक्ट्स बनाए हैं जिनमें एंटरप्राइज़ वेब एप्लिकेशन, सिक्योरिटी टूल्स और क्लाउड इन्फ्रास्ट्रक्चर सॉल्यूशंस शामिल हैं। प्रोजेक्ट्स सेक्शन देखें।",
    ru: "Корнелиус создал различные проекты, включая корпоративные веб-приложения, инструменты безопасности и облачные инфраструктурные решения. Смотрите раздел Проекты.",
  },
  hire: {
    en: "To hire Cornelius, please use the contact form on this website or reach out at tixsyncsolutions@gmail.com. He's available for freelance projects, consulting, and full-time opportunities.",
    es: "Para contratar a Cornelius, usa el formulario de contacto o escribe a tixsyncsolutions@gmail.com. Está disponible para proyectos freelance, consultoría y oportunidades a tiempo completo.",
    fr: "Pour engager Cornelius, utilisez le formulaire de contact ou écrivez à tixsyncsolutions@gmail.com. Il est disponible pour des projets freelance, du conseil et des opportunités à temps plein.",
    de: "Um Cornelius zu beauftragen, nutzen Sie das Kontaktformular oder schreiben Sie an tixsyncsolutions@gmail.com. Er steht für Freelance-Projekte, Beratung und Vollzeitmöglichkeiten zur Verfügung.",
    ar: "لتوظيف كورنيليوس، استخدم نموذج الاتصال أو تواصل عبر tixsyncsolutions@gmail.com. متاح للمشاريع الحرة والاستشارات والفرص بدوام كامل.",
    zh: "要雇佣Cornelius，请使用网站上的联系表单或通过tixsyncsolutions@gmail.com联系。他可接受自由职业项目、咨询和全职机会。",
    ja: "Corneliusを雇用するには、ウェブサイトのお問い合わせフォームまたはtixsyncsolutions@gmail.comまでご連絡ください。フリーランスプロジェクト、コンサルティング、正社員の機会に対応しています。",
    ko: "Cornelius를 고용하려면 웹사이트의 연락 양식을 사용하거나 tixsyncsolutions@gmail.com으로 연락해 주세요. 프리랜서 프로젝트, 컨설팅, 정규직 기회를 제공합니다.",
    hi: "Cornelius को hire करने के लिए, वेबसाइट पर संपर्क फॉर्म का उपयोग करें या tixsyncsolutions@gmail.com पर संपर्क करें। वे फ्रीलांस प्रोजेक्ट्स, कंसल्टिंग और फुल-टाइम अवसरों के लिए उपलब्ध हैं।",
    ru: "Чтобы нанять Корнелиуса, используйте форму связи на сайте или напишите на tixsyncsolutions@gmail.com. Он доступен для фриланс-проектов, консалтинга и постоянной работы.",
  },
  contact: {
    en: "You can reach Cornelius at tixsyncsolutions@gmail.com or +254704440164. You can also use the contact form on this website.",
    es: "Puedes contactar a Cornelius en tixsyncsolutions@gmail.com o +254704440164. También puedes usar el formulario de contacto en este sitio web.",
    fr: "Vous pouvez contacter Cornelius à tixsyncsolutions@gmail.com ou +254704440164. Vous pouvez aussi utiliser le formulaire de contact sur ce site.",
    de: "Cornelius erreichen Sie unter tixsyncsolutions@gmail.com oder +254704440164. Nutzen Sie auch das Kontaktformular auf dieser Website.",
    ar: "يمكنك التواصل مع كورنيليوس عبر tixsyncsolutions@gmail.com أو +254704440164. يمكنك أيضاً استخدام نموذج الاتصال على هذا الموقع.",
    zh: "您可以通过tixsyncsolutions@gmail.com或+254704440164联系Cornelius。也可以使用本网站上的联系表单。",
    ja: "Corneliusはtixsyncsolutions@gmail.comまたは+254704440164で連絡できます。このウェブサイトのお問い合わせフォームもご利用ください。",
    ko: "Cornelius에게 tixsyncsolutions@gmail.com 또는 +254704440164로 연락하실 수 있습니다. 이 웹사이트의 연락 양식도 사용 가능합니다.",
    hi: "Cornelius से tixsyncsolutions@gmail.com या +254704440164 पर संपर्क कर सकते हैं। इस वेबसाइट पर संपर्क फॉर्म का भी उपयोग कर सकते हैं।",
    ru: "Свяжитесь с Корнелиусом по адресу tixsyncsolutions@gmail.com или +254704440164. Также можно использовать форму связи на этом сайте.",
  },
  tixsync: {
    en: "TIXSYNC SOLUTIONS is Cornelius's company, providing enterprise-grade web development, cybersecurity, cloud infrastructure, and digital transformation solutions across Africa.",
    es: "TIXSYNC SOLUTIONS es la empresa de Cornelius, proporcionando desarrollo web de nivel empresarial, ciberseguridad, infraestructura en la nube y soluciones de transformación digital en toda África.",
    fr: "TIXSYNC SOLUTIONS est l'entreprise de Cornelius, offrant des solutions de développement web, cybersécurité, infrastructure cloud et transformation numérique de niveau entreprise à travers l'Afrique.",
    de: "TIXSYNC SOLUTIONS ist Cornelius' Unternehmen und bietet unternehmensgerechte Webentwicklung, Cybersicherheit, Cloud-Infrastruktur und Digitale Transformationslösungen in ganz Afrika.",
    ar: "TIXSYNC SOLUTIONS هي شركة كورنيليوس، توفر حلول تطوير ويب و.cybersecurity وبنية تحتية سحابية وتحول رقمي على مستوى المؤسسات في جميع أنحاء أفريقيا.",
    zh: "TIXSYNC SOLUTIONS是Cornelius的公司，在非洲各地提供企业级Web开发、网络安全、云基础设施和数字化转型解决方案。",
    ja: "TIXSYNC SOLUTIONSはCorneliusの会社で、アフリカ全土にエンタープライズグレードのWeb開発、サイバーセキュリティ、クラウドインフラ、デジタルトランスフォーメーションソリューションを提供しています。",
    ko: "TIXSYNC SOLUTIONS는 Cornelius의 회사로, 아프리카 전역에 기업 수준의 웹 개발, 사이버 보안, 클라우드 인프라 및 디지털 전환 솔루션을 제공합니다.",
    hi: "TIXSYNC SOLUTIONS Cornelius की कंपनी है, जो पूरे अफ्रीका में एंटरप्राइज़-ग्रेड वेब डेवलपमेंट, साइबर सुरक्षा, क्लाउड इन्फ्रास्ट्रक्चर और डिजिटल ट्रांसफॉर्मेशन सॉल्यूशंस प्रदान करती है।",
    ru: "TIXSYNC SOLUTIONS — компания Корнелиуса, предоставляющая корпоративные решения в области веб-разработки, кибербезопасности, облачной инфраструктуры и цифровой трансформации по всей Африке.",
  },
  cybersecurity: {
    en: "Cornelius is a cybersecurity expert with skills in Penetration Testing, SOC Operations, and Security Architecture. He helps organizations identify and mitigate security vulnerabilities.",
    es: "Cornelius es un experto en ciberseguridad con habilidades en Pruebas de Penetración, Operaciones SOC y Arquitectura de Seguridad.",
    fr: "Cornelius est un expert en cybersécurité compétent en Tests de Pénétration, Opérations SOC et Architecture Sécurité.",
    de: "Cornelius ist ein Cybersicherheitsexperte mit Fähigkeiten in Penetrationstests, SOC-Operationen und Sicherheitsarchitektur.",
    ar: "كورنيليوس خبير في الأمن السيبراني بمهارات في اختبارات الاختراق وعمليات SOC وهندسة الأمن.",
    zh: "Cornelius是网络安全专家，擅长渗透测试、SOC运营和安全架构。",
    ja: "Corneliusはペネトレーションテスト、SOC運用、セキュリティアーキテクチャのスキルを持つサイバーセキュリティ専門家です。",
    ko: "Cornelius는 침투 테스트, SOC 운영, 보안 아키텍처 기술을 보유한 사이버 보안 전문가입니다.",
    hi: "Cornelius एक साइबर सुरक्षा विशेषज्ञ हैं जिनके पास पेनेट्रेशन टेस्टिंग, SOC ऑपरेशंस और सिक्योरिटी आर्किटेक्चर में कौशल है।",
    ru: "Корнелиус — эксперт по кибербезопасности с навыками в пентестах, операциях SOC и архитектуре безопасности.",
  },
  web: {
    en: "Cornelius is a full-stack developer specializing in React, Next.js, TypeScript, and Node.js. He builds modern, performant, and scalable web applications.",
    es: "Cornelius es un desarrollador full-stack especializado en React, Next.js, TypeScript y Node.js. Construye aplicaciones web modernas, eficientes y escalables.",
    fr: "Cornelius est un développeur full-stack spécialisé en React, Next.js, TypeScript et Node.js. Il crée des applications web modernes, performantes et évolutives.",
    de: "Cornelius ist Full-Stack-Entwickler mit Spezialisierung auf React, Next.js, TypeScript und Node.js. Er entwickelt moderne, leistungsstarke und skalierbare Webanwendungen.",
    ar: "كورنيليوس مطور Full-Stack متخصص في React وNext.js وTypeScript وNode.js. يبني تطبيقات ويب حديثة وعالية الأداء وقابلة للتوسع.",
    zh: "Cornelius是全栈开发者，专注于React、Next.js、TypeScript和Node.js。他构建现代、高性能、可扩展的Web应用。",
    ja: "CorneliusはReact、Next.js、TypeScript、Node.jsを専門とするフルスタック開発者です。モダンで高性能、スケーラブルなWebアプリケーションを構築します。",
    ko: "Cornelius는 React, Next.js, TypeScript, Node.js를 전문으로 하는 풀스택 개발자입니다. 현대적이고 고성능이며 확장 가능한 웹 애플리케이션을 구축합니다.",
    hi: "Cornelius React, Next.js, TypeScript और Node.js में विशेषज्ञता रखने वाले फुल-स्टैक डेवलपर हैं। वे आधुनिक, उच्च प्रदर्शन और स्केलेबल वेब एप्लिकेशन बनाते हैं।",
    ru: "Корнелиус — full-stack разработчик, специализирующийся на React, Next.js, TypeScript и Node.js. Создаёт современные, производительные и масштабируемые веб-приложения.",
  },
  thanks: {
    en: "You're welcome! Feel free to reach out anytime at tixsyncsolutions@gmail.com. Have a great day!",
    es: "¡De nada! No dudes en contactar en tixsyncsolutions@gmail.com. ¡Que tengas un excelente día!",
    fr: "De rien ! N'hésitez pas à contacter tixsyncsolutions@gmail.com. Excellente journée !",
    de: "Gern geschehen! Kontaktieren Sie tixsyncsolutions@gmail.com. Einen schönen Tag noch!",
    ar: "على الرحب والسماحة! لا تتردد في التواصل عبر tixsyncsolutions@gmail.com. أتمنى لك يوماً رائعاً!",
    zh: "不客气！随时通过tixsyncsolutions@gmail.com联系。祝您有美好的一天！",
    ja: "どういたしまして！tixsyncsolutions@gmail.comまでお気軽にご連絡ください。素晴らしい一日を！",
    ko: "천만에요! tixsyncsolutions@gmail.com으로 언제든지 연락해 주세요. 좋은 하루 되세요!",
    hi: "आपका स्वागत है! कभी भी tixsyncsolutions@gmail.com पर संपर्क करें। आपका दिन शुभ हो!",
    ru: "Пожалуйста! Обращайтесь на tixsyncsolutions@gmail.com. Хорошего дня!",
  },
  help: {
    en: "I can help you learn about Cornelius's skills, experience, projects, and services. I can also help you get in touch for hiring opportunities. What would you like to know?",
    es: "Puedo ayudarte a conocer las habilidades, experiencia, proyectos y servicios de Cornelius. También puedo ayudarte a ponerte en contacto. ¿Qué te gustaría saber?",
    fr: "Je peux vous aider à découvrir les compétences, l'expérience, les projets et les services de Cornelius. Que souhaitez-vous savoir ?",
    de: "Ich kann Ihnen helfen, Cornelius' Fähigkeiten, Erfahrung, Projekte und Dienstleistungen kennenzulernen. Was möchten Sie wissen?",
    ar: "يمكنني مساعدتك في التعرف على مهارات Cornelius وخبراته ومشاريعه وخدماته. ماذا تريد أن تعرف؟",
    zh: "我可以帮助你了解Cornelius的技能、经验、项目和服务。你想了解什么？",
    ja: "Corneliusのスキル、経験、プロジェクト、サービスについてお手伝いします。何を知りたいですか？",
    ko: "Cornelius의 기술, 경험, 프로젝트 및 서비스에 대해了解하는 데 도움을 드릴 수 있습니다. 무엇을 알고 싶으신가요?",
    hi: "मैं Cornelius की स्किल्स, अनुभव, प्रोजेक्ट्स और सेवाओं के बारे में जानने में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?",
    ru: "Я могу помочь узнать о навыках, опыте, проектах и услугах Корнелиуса. Что вы хотите узнать?",
  },
  portfolio: {
    en: "Cornelius's portfolio showcases his work in full-stack development and cybersecurity. Check the Projects section for detailed case studies, or visit his GitHub at github.com/PixelCode254 for open-source contributions.",
    es: "El portafolio de Cornelius muestra su trabajo en desarrollo full-stack y ciberseguridad. Consulta la sección de Proyectos o visita su GitHub.",
    fr: "Le portfolio de Cornelius présente son travail en développement full-stack et cybersécurité. Consultez la section Projets ou visitez son GitHub.",
    de: "Cornelius' Portfolio zeigt seine Arbeit in Full-Stack-Entwicklung und Cybersicherheit. Siehe Projekt-Sektion oder besuchen Sie sein GitHub.",
    ar: "يعرض معرض أعمال كورنيليوس عمله في تطوير Full-Stack والأمن السيبراني. تصفح قسم المشاريع أو زر GitHub الخاص به.",
    zh: "Cornelius的作品集展示了他在全栈开发和网络安全方面的工作。查看项目部分或访问他的GitHub。",
    ja: "Corneliusのポートフォリオは、フルスタック開発とサイバーセキュリティの作品を紹介しています。プロジェクトセクションまたはGitHubをご確認ください。",
    ko: "Cornelius의 포트폴리오는 풀스택 개발과 사이버 보안 분야의 작품을 선보입니다. 프로젝트 섹션이나 GitHub을 확인해 주세요.",
    hi: "Cornelius का पोर्टफोलियो फुल-स्टैक डेवलपमेंट और साइबर सुरक्षा में उनके काम को प्रदर्शित करता है। प्रोजेक्ट्स सेक्शन या GitHub देखें।",
    ru: "Портфолио Корнелиуса демонстрирует его работу в full-stack разработке и кибербезопасности. Смотрите раздел Проекты или его GitHub.",
  },
  fallback: {
    en: "That's a great question! While I may not have a specific answer for that, I'd recommend reaching out to Cornelius directly at tixsyncsolutions@gmail.com or using the contact form. Is there anything specific about his skills or experience I can help with?",
    es: "¡Buena pregunta! Te recomiendo contactar a Cornelius directamente en tixsyncsolutions@gmail.com o usar el formulario de contacto. ¿Hay algo específico sobre sus habilidades en lo que pueda ayudarte?",
    fr: "Excellente question ! Je vous recommande de contacter Cornelius directement à tixsyncsolutions@gmail.com ou d'utiliser le formulaire de contact. Puis-je vous aider avec quelque chose de spécifique ?",
    de: "Das ist eine tolle Frage! Ich empfehle, Cornelius direkt unter tixsyncsolutions@gmail.com zu kontaktieren oder das Kontaktformular zu nutzen. Kann ich Ihnen bei etwas Bestimmtem helfen?",
    ar: "سؤال رائع! أنصحك بالتواصل مع كورنيليوس مباشرة عبر tixsyncsolutions@gmail.com أو استخدام نموذج الاتصال. هل هناك شيء محدد يمكنني مساعدتك به؟",
    zh: "这是一个很好的问题！建议直接联系Cornelius：tixsyncsolutions@gmail.com或使用联系表单。关于他的技能或经验有什么具体问题我可以帮您解答吗？",
    ja: "良いご質問ですね！Corneliusに直接tixsyncsolutions@gmail.comで連絡するか、お問い合わせフォームをご利用ください彼のスキルや経験について具体的にお手伝いできることはありますか？",
    ko: "좋은 질문입니다! Cornelius에게 tixsyncsolutions@gmail.com으로 직접 연락하거나 연락 양식을 사용하시는 것을 추천드립니다. 그의 기술이나 경험에 대해 도움이 필요한 부분이 있으신가요?",
    hi: "बहुत अच्छा सवाल है! मेरा सुझाव है कि Cornelius से सीधे tixsyncsolutions@gmail.com पर संपर्क करें या संपर्क फॉर्म का उपयोग करें। उनकी स्किल्स या अनुभव के बारे में कोई विशिष्ट प्रश्न है?",
    ru: "Отличный вопрос! Рекомендую связаться с Корнелиусом напрямую: tixsyncsolutions@gmail.com или через форму связи. Могу ли я помочь с чем-то конкретным о его навыках или опыте?",
  },
};

const LANG_CODES = ["en","es","fr","pt","de","it","nl","ru","zh","ja","ko","ar","hi","tr","pl","th","vi","id","sw","tl","bn","ur","fa","he","el","cs","ro","hu","sv","no","da","fi","uk","bg","hr","sk","lt","lv","et","ka","hy","az","kk","uz","mn","ne","am"];

const GREETINGS: Record<string, string[]> = {
  en: ["hello","hi","hey","good morning","good afternoon","good evening"],
  es: ["hola","buenos días","buenas tardes"],
  fr: ["bonjour","salut","bonsoir"],
  pt: ["olá","oi","bom dia"],
  de: ["hallo","guten morgen","guten tag"],
  it: ["ciao","buongiorno","salve"],
  nl: ["hallo","goedemorgen"],
  ru: ["привет","здравствуйте","доброе утро"],
  zh: ["你好","您好","早上好"],
  ja: ["こんにちは","おはよう","こんばんは"],
  ko: ["안녕하세요","안녕하십니까"],
  ar: ["مرحبا","أهلا","صباح الخير"],
  hi: ["नमस्ते","नमस्कार","शुभ प्रभात"],
  tr: ["merhaba","iyi günler","günaydın"],
  pl: ["cześć","witaj","dzień dobry"],
  th: ["สวัสดี","สวัสดีครับ"],
  vi: ["xin chào","chào bạn"],
  id: ["halo","hai","selamat pagi"],
  sw: ["habari","jambo"],
};

const KNOWN_LANGS = Object.keys(GREETINGS);

function detectLanguage(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [lang, greetings] of Object.entries(GREETINGS)) {
    for (const g of greetings) {
      if (lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g) || lower.includes(g)) {
        return lang;
      }
    }
  }
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return "ja";
  if (/[\uac00-\ud7af]/.test(text)) return "ko";
  if (/[\u0600-\u06ff]/.test(text)) return "ar";
  if (/[\u0900-\u097f]/.test(text)) return "hi";
  if (/[\u0e00-\u0e7f]/.test(text)) return "th";
  if (/[\u0400-\u04ff]/.test(text)) return "ru";
  return "en";
}

function getResponse(lang: string, key: string): string {
  return REPLIES[key]?.[lang] || REPLIES[key]?.en || REPLIES.fallback.en;
}

function matchIntent(text: string): { intent: string; priority: number } {
  const lower = text.toLowerCase();
  const checks: [RegExp, string, number][] = [
    [/\b(thanks?|thank you|bye|goodbye|see you|cheers)\b/i, "thanks", 10],
    [/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/i, "greeting", 10],
    [/\b(help|what can|how|what do you)\b/i, "help", 9],
    [/\b(about|who|team|founder|cornelius|company|story|background|introduce)\b/i, "about", 8],
    [/\b(skill|skilled|proficient|expertise|technology|tech stack|languages?|frameworks?)\b/i, "skills", 8],
    [/\b(project|portfolio|work|code|github|built|created|showcase)\b/i, "projects", 8],
    [/\b(hire|employment|job|freelance|contract|consulting|work with|available)\b/i, "hire", 8],
    [/\b(contact|email|phone|reach|get in touch|call|whatsapp)\b/i, "contact", 8],
    [/\b(tixsync|solution|company|business|venture|media)\b/i, "tixsync", 8],
    [/\b(cybersecurity|security|penetration|soc|firewall|siem|hack)\b/i, "cybersecurity", 7],
    [/\b(web\s*(dev|develop)|react|next\.?js|node\.?js|typescript|python|full.?stack|website)\b/i, "web", 7],
    [/\b(portfolio|work|resume|cv)\b/i, "portfolio", 7],
  ];
  
  let best = { intent: "fallback", priority: 0 };
  for (const [pattern, intent, priority] of checks) {
    if (pattern.test(lower) && priority > best.priority) {
      best = { intent, priority };
    }
  }
  return best;
}

export async function POST(request: Request) {
  try {
    const { messages, language } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Please send a message to start the conversation." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const lang = (language && LANG_CODES.includes(language)) ? language : "en";

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
      } catch {
        // Fall through to fallback
      }
    }

    const lastMsg = messages[messages.length - 1]?.content || "";
    const detectedLang = detectLanguage(lastMsg);
    const responseLang = detectedLang !== "en" ? detectedLang : lang;

    const { intent } = matchIntent(lastMsg);
    let reply: string;

    if (intent === "greeting") {
      reply = getResponse(responseLang, "about");
    } else if (intent === "thanks") {
      reply = getResponse(responseLang, "thanks");
    } else {
      reply = getResponse(responseLang, intent);
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
