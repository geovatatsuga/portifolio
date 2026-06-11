
import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';

export const PROFILE = {
  name: "Jeová Anderson",
  role: {
    en: "Data Analyst & BI Specialist",
    pt: "Analista de Dados & Especialista em BI"
  },
  tagline: {
    en: "Transforming data into strategic decisions through analytics, visualization, and business intelligence.",
    pt: "Transformando dados em decisões estratégicas através de analytics, visualização e business intelligence."
  },
  // Short related titles rendered under the main role in the hero section
  titles: {
    en: "Data Analyst - Business Intelligence - Data Science - Python & SQL",
    pt: "Analista de Dados - Business Intelligence - Ciência de Dados - Python & SQL"
  },
  about: {
    en: `Driven by curiosity and the desire to solve real business problems through data, I specialize in transforming raw data into actionable insights. 
    I find true satisfaction in building analytical solutions that drive strategic decisions—whether optimizing processes, detecting fraud, or uncovering growth opportunities.
    I believe that success in Data Analytics and Business Intelligence comes from the combination of technical rigor, business acumen, and continuous learning.
    
    With feet on the ground and eyes on the metrics, I seek to grow as a data professional and, at the same time, empower organizations to make evidence-based decisions.`,
    pt: `Movido pela curiosidade e pelo desejo de resolver problemas reais de negócio através de dados, me especializo em transformar dados brutos em insights acionáveis.
    Acredito que o sucesso em Análise de Dados e Business Intelligence vem da combinação de rigor técnico, visão de negócio e aprendizado contínuo.`
  },
  contact: {
    email: "jeova.herminio@gmail.com",
    phone: "+55 83 98803-8348",
    social: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/jeova-anderson/", icon: Linkedin },
      { name: "GitHub", url: "https://github.com/geovatatsuga", icon: Github },
      { name: "Medium", url: "https://medium.com/@jeova.anderson", icon: FileText },
    ]
  }
};

export const PROJECTS = [
  {
    title: { en: "Fraud Risk BI", pt: "Fraud Risk BI" },
    category: "Business Intelligence",
    subtitle: { en: "Risk dashboard & data storytelling", pt: "Dashboard de risco & narrativa de dados" },
    date: "2026",
    image: `${import.meta.env.BASE_URL}Captura de tela 2026-06-06 aBI.png`,
    imageRatio: "1500 / 697",
    tags: ["Business Intelligence", "Data Science", "Python", "SQL", "Dashboard", "Fraud Detection"],
    description: {
      en: "Interactive BI interface for fraud-risk analysis, focused on fast reading, visual hierarchy, KPI cards and decision-ready charts for operational monitoring.",
      pt: "Interface de BI interativa para análise de risco de fraude, com foco em leitura rápida, hierarquia visual, cards de KPI e gráficos prontos para decisão."
    },
    url: "https://fraud-risk-bi.vercel.app/",
    subProject: {
      title: { en: "Lakehouse Fraud Detection", pt: "Detecção de Fraudes Lakehouse" },
      subtitle: { en: "Azure Databricks + Delta Lake + MLflow", pt: "Azure Databricks + Delta Lake + MLflow" },
      code: "SYS-0",
      url: "https://medium.com/@jeova.anderson/construindo-uma-pipeline-de-detec%C3%A7%C3%A3o-de-fraudes-com-azure-databricks-delta-lake-e-machine-learning-007af284a4d3",
      description: {
        en: "End-to-end lakehouse pipeline for fraud detection, processing 6.36M+ PaySim transactions across Bronze, Silver, and Gold layers. Random Forest with features achieved 99.45% recall and R$ 73.21M in simulated financial savings.",
        pt: "Pipeline lakehouse ponta a ponta para detecção de fraudes processando 6,36M+ transações PaySim em camadas Bronze, Silver e Gold. Random Forest com features alcançou 99,45% de recall e R$ 73,21M de ganho financeiro simulado."
      },
      tags: ["Azure Databricks", "Delta Lake", "PySpark", "MLflow", "Random Forest", "Fraud Detection", "Feature Engineering", "PaySim"]
    }
  },
  {
    title: { en: "Customer Segmentation", pt: "Segmentação de Clientes" },
    category: "Business Intelligence",
    subtitle: { en: "RFM + K-means Clustering", pt: "RFM + Clusterização K-means" },
    date: "04/2025",
    image: `${import.meta.env.BASE_URL}project-customer-segmentation.png`,
    imageRatio: "1500 / 697",
    tags: ["Python", "K-Means", "RFM", "Plotly", "Dash", "Customer Analytics"],
    description: {
      en: "Behavioral segmentation with RFM features, statistical transformations and K-Means. Classified customers into 10 business subgroups and 4 clusters, delivered through an interactive Dash and Plotly dashboard.",
      pt: "Segmentação comportamental com features RFM, transformações estatísticas e K-Means. Classifiquei clientes em 10 subgrupos de negócio e 4 clusters, entregando a análise em dashboard interativo com Dash e Plotly."
    },
    url: "https://medium.com/@jeova.anderson/segmenta%C3%A7%C3%A3o-de-clientes-com-rfm-k-means-4e75c98f00d9"
  },
  {
    title: { en: "Churn Prediction Dashboard", pt: "Previsão de Churn" },
    category: "Business Intelligence",
    subtitle: { en: "End-to-End Analytics", pt: "Analytics Ponta a Ponta" },
    date: "04/2025",
    image: `${import.meta.env.BASE_URL}project-churn-prediction.png`,
    imageRatio: "1500 / 697",
    tags: ["SQL", "Pandas", "Random Forest", "Dash", "Plotly", "Churn Analytics"],
    description: {
      en: "Integrated churn solution with SQL Server extraction, Python preprocessing, Random Forest training on 1,926 samples and Dash/Plotly dashboards. Reached 81% accuracy and highlighted the main churn drivers.",
      pt: "Solução integrada de churn com extração via SQL Server, pré-processamento em Python, Random Forest em 1.926 amostras e dashboards Dash/Plotly. Alcancei 81% de acurácia e destaquei os principais fatores de churn."
    },
    url: "https://medium.com/@jeova.anderson/3-dashboards-1-objetivo-prevendo-e-evitando-churn-com-random-forest-d729f9b289a4"
  },
  {
    title: { en: "Cereus CRM", pt: "Cereus CRM" },
    category: "Data Analytics",
    subtitle: { en: "Customer workflow & business intelligence", pt: "Fluxo de clientes & inteligência de negócio" },
    date: "2026",
    image: `${import.meta.env.BASE_URL}Captura de tela 2026-06-06 184907.png`,
    imageRatio: "1530 / 697",
    tags: ["CRM", "Data Analytics", "Business Intelligence", "React", "Dashboard", "Customer Data"],
    description: {
      en: "CRM-style product interface for organizing customer data, actions and business context with a cleaner workflow and analytics-ready visual structure.",
      pt: "Interface de produto no estilo CRM para organizar dados de clientes, ações e contexto de negócio com fluxo limpo e estrutura visual pronta para analytics."
    },
    url: "https://cereus-snowy.vercel.app/"
  }
];

export const EXPERIENCE = [
  {
    company: "Vsoft Tecnologia",
    role: { en: "Data & Governance Intern", pt: "Estagiário de Dados & Governança" },
    period: "07/2025 - 12/2025",
    description: [
      { en: "Built and maintained an internal-documentation RAG system, reducing manual information search time by ~40%.", pt: "Desenvolvi e mantive sistema de RAG para consulta de documentação interna, reduzindo em ~40% o tempo de busca manual por informações." },
      { en: "Contributed to the corporate chatbot 'Vivi', automating 200+ monthly interactions for internal users.", pt: "Participei da criação do Chatbot Vivi, automatizando mais de 200 interações mensais de usuários internos." },
      { en: "Automated contract-management emails with Python scripts, eliminating around 3 hours of manual work per week.", pt: "Automatizei envios de e-mails de gestão de contratos com scripts Python, eliminando cerca de 3h semanais de trabalho manual." },
      { en: "Built an integrated dashboard consolidating KPIs from 3 areas, adopted by leadership for monthly monitoring.", pt: "Construí dashboard integrada consolidando KPIs de 3 áreas, adotada pela liderança como ferramenta de monitoramento mensal." }
    ]
  },
  {
    company: "Arquivo dos Governadores",
    role: { en: "Data Organization Intern", pt: "Estagiário de Organização de Dados" },
    period: "01/2024 - 12/2024",
    description: [
      { en: "Organized and digitized 1,200+ historical documents, enabling digital access to the archive.", pt: "Organizei e digitalizei mais de 1.200 documentos históricos, viabilizando acesso digital ao acervo." },
      { en: "Created Excel pivot tables that reduced document-control systematization time by ~50%.", pt: "Criei tabelas dinâmicas no Excel que reduziram em ~50% o tempo de sistematização e controle documental." },
      { en: "Restructured the collection counting and classification workflow, increasing team productivity by ~30%.", pt: "Reestruturei o fluxo de contagem e classificação de acervos, aumentando a produtividade do setor em aproximadamente 30%." }
    ]
  },
  {
    company: "Marcos Inácio Advogados",
    role: { en: "Administrative Assistant", pt: "Auxiliar Administrativo" },
    period: "04/2021 - 08/2021",
    description: [
      { en: "Managed material inflow/outflow and receipt records with 100% register accuracy during the period.", pt: "Controlei entrada e saída de materiais e emissão de recibos, mantendo acurácia de 100% nos registros durante o período." },
      { en: "Implemented a resource-control spreadsheet that reduced administrative management time by ~25%.", pt: "Implementei planilha de controle de recursos que reduziu em ~25% o tempo gasto na gestão administrativa do escritório." }
    ]
  }
];

export const SKILLS = [
  {
    category: { en: "Data Analytics", pt: "Análise de Dados" },
    items: ["Python (Pandas, NumPy)", "SQL (PostgreSQL, MySQL)", "Data Cleaning", "EDA", "Statistical Analysis", "A/B Testing"]
  },
  {
    category: { en: "Business Intelligence", pt: "Business Intelligence" },
    items: ["Power BI", "DAX", "Data Modeling", "Dashboard Design", "KPI Definition", "Executive Reporting", "ETL/ELT Pipelines"]
  },
  {
    category: { en: "Data Science & ML", pt: "Ciência de Dados & ML" },
    items: ["Scikit-learn", "Random Forest", "XGBoost", "Feature Engineering", "Model Evaluation", "MLflow", "PySpark"]
  },
  {
    category: { en: "Data Engineering", pt: "Engenharia de Dados" },
    items: ["Azure Databricks", "Delta Lake", "Medallion Architecture", "Airflow", "Data Quality", "Data Governance"]
  },
  {
    category: { en: "Tools & Visualization", pt: "Ferramentas & Visualização" },
    items: ["Git", "GitHub", "Power BI", "Excel Advanced", "Jupyter", "VS Code", "Figma (Data Viz)"]
  }
];

export const EDUCATION = [
  {
    institution: "Universidade Estadual da Paraíba (UEPB)",
    degree: { en: "Technologist in Data Science", pt: "Tecnólogo em Ciência de Dados" },
    period: { en: "Conclusion 06/2026", pt: "Conclusão 06/2026" },
    details: { en: "Academic track focused on data, engineering, artificial intelligence and business impact.", pt: "Formação com foco em dados, engenharia, inteligência artificial e impacto de negócio." }
  }
];

export const UI_TEXT = {
  nav: {
    about: { en: "About", pt: "Sobre" },
    work: { en: "Projects", pt: "Projetos" },
    skills: { en: "Skills", pt: "Habilidades" },
    lab: { en: "Lab", pt: "Lab" },
    resume: { en: "Resume", pt: "Currículo" },
    contact: { en: "Contact", pt: "Contato" },
  },
  hero: {
    scroll: { en: "Explore Projects", pt: "Explorar Projetos" },
    active: { en: "Data Pipeline Active", pt: "Pipeline de Dados Ativo" }
  },
  about: {
    section: { en: "01. / PROFILE", pt: "01. / PERFIL" },
    title: { en: "The Analyst", pt: "O Analista" },
    subtitle: { en: "Behind the Insights", pt: "Por trás dos Insights" },
    focus: { en: "Primary Focus", pt: "Foco Principal" },
    based: { en: "Location", pt: "Localização" },
    remote: { en: "Available Remote", pt: "Disponível Remoto" },
    exp: { en: "Experience", pt: "Experiência" },
    years: { en: "3+ Years", pt: "3+ Anos" }
  },
  projects: {
    section: { en: "02. / PROJECTS", pt: "02. / PROJETOS" },
    title: { en: "Data & BI Solutions", pt: "Soluções de Dados & BI" },
    interact: { en: "Click to Explore", pt: "Clique para Explorar" },
    files: { en: "FILES", pt: "ARQUIVOS" }
  },
  skills: {
    section: { en: "03. / CAPABILITIES", pt: "03. / COMPETÊNCIAS" },
    title: { en: "Technical Stack", pt: "Stack Técnico" }
  },
  lab: {
    section: { en: "04. / EXPERIMENTS", pt: "04. / EXPERIMENTOS" },
    title: { en: "Data Sandbox.", pt: "Sandbox de Dados." },
    subtitle: { en: "Interactive Analytics Playground", pt: "Playground Interativo de Analytics" },
    modes: {
      entropy: { en: "Entropy", pt: "Entropia" },
      neural: { en: "Neural", pt: "Neural" },
      phase: { en: "Phase", pt: "Fase" },
      optimize: { en: "Optimize", pt: "Otimizar" }
    },
    hints: {
      entropy: { en: "Hold to Collapse • Release to Explode", pt: "Segure para Colapsar • Solte para Explodir" },
      neural: { en: "Hold to Inject Signal Interference", pt: "Segure para Injetar Interferência" },
      phase: { en: "Click to Melt • Move Fast to Heat", pt: "Clique para Derreter • Mova Rápido para Aquecer" },
      optimize: { en: "Topology Field • Hold to Regularize", pt: "Campo Topológico • Segure para Regularizar" }
    },
    titles: {
      entropy: { en: "Entropy Control", pt: "Controle de Entropia" },
      neural: { en: "Neural Lattice", pt: "Rede Neural" },
      phase: { en: "Phase Transition", pt: "Transição de Fase" },
      optimize: { en: "Gradient Flow", pt: "Fluxo de Gradiente" }
    }
  },
  resume: {
    title: { en: "Curriculum Vitae", pt: "Curriculum Vitae" },
    download: { en: "Download PDF", pt: "Baixar PDF" },
    education: { en: "Education", pt: "Educação" },
    experience: { en: "Experience Log", pt: "Registro de Experiência" }
  },
  contact: {
    signal: { en: "Signal detected. Data ready.", pt: "Sinal detectado. Dados prontos." },
    title: { en: "Let's Build with Data.", pt: "Vamos Construir com Dados." },
    system: { en: "System Nominal", pt: "Sistema Nominal" },
    rights: { en: "All rights reserved.", pt: "Todos os direitos reservados." }
  }
};

export const GENAI_PROJECTS = [
  {
    title: { en: "MythosEngine", pt: "MythosEngine" },
    subtitle: { en: "Multi-Agent Narrative Architecture", pt: "Arquitetura Narrativa Multiagente" },
    code: "GEN-0",
    image: `${import.meta.env.BASE_URL}project-mythos.png`,
    imageRatio: "1024 / 470",
    category: "AI Engine / Agentic",
    description: {
      en: "Multi-agent architecture for generating long, coherent narratives with structured memory, designed to support complex scripts, books and creative production workflows.",
      pt: "Arquitetura multiagente para gerar narrativas longas e coerentes com memória estruturada, apoiando roteiros, livros e fluxos de produção criativa."
    },
    tags: ["Generative AI", "LLMs", "Multi-Agent Systems", "Python", "LangChain", "Memory Systems"],
    url: "https://medium.com/@jeova.anderson/mythosengine-uma-simples-arquitetura-multiagente-para-gerar-narrativas-longas-com-mem%C3%B3ria-em-cdd3b567c611"
  },
  {
    title: { en: "Big Bang Theory", pt: "Big Bang Theory" },
    subtitle: { en: "Character-driven web experience", pt: "Experiência web baseada em personagens" },
    code: "SYS-1",
    image: `${import.meta.env.BASE_URL}project-big-bang.png`,
    imageRatio: "1500 / 697",
    category: "FrontEnd Develop / AI-ready Interface",
    description: {
      en: "Themed front-end project with content organization, visual rhythm and responsive interaction, turning pop culture into a polished web interface that can evolve into character-based AI experiences.",
      pt: "Projeto front-end temático com organização de conteúdo, ritmo visual e interação responsiva, transformando cultura pop em uma interface polida que pode evoluir para experiências de IA baseadas em personagens."
    },
    tags: ["FrontEnd Develop", "React", "JavaScript", "Responsive UI", "Character UI", "AI Interface"],
    url: "https://big-bang-theory-sigma.vercel.app/"
  },
  {
    title: { en: "Novel-to-Webtoon Pipeline", pt: "Pipeline Novel para Webtoon" },
    subtitle: { en: "Multimodal Generative Pipeline", pt: "Pipeline Generativa Multimodal" },
    code: "GEN-1",
    image: `${import.meta.env.BASE_URL}project-webtoon.png`,
    imageRatio: "1024 / 470",
    category: "Generative AI / Pipeline",
    description: {
      en: "End-to-end pipeline that converts webnovel chapters into digital comics by combining LLM-based scripting with generative image workflows for visual consistency.",
      pt: "Pipeline ponta a ponta que converte capítulos de webnovel em quadrinhos digitais, combinando roteirização com LLMs e fluxos de imagem generativa para consistência visual."
    },
    tags: ["Generative AI", "LLMs", "Stable Diffusion", "Prompt Engineering", "Multimodal", "Pipeline"],
    url: "https://medium.com/@jeova.anderson/transformando-um-cap%C3%ADtulo-de-novel-em-uma-pipeline-completa-de-webtoon-com-ia-350d2ec38f47"
  }
];
