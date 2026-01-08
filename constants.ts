
import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';

export const PROFILE = {
  name: "Jeová Anderson",
  role: {
    en: "Data Scientist & AI Engineer",
    pt: "Cientista de Dados & Engenheiro de IA"
  },
  tagline: {
    en: "Transforming data into real solutions.",
    pt: "Transformando dados em soluções reais."
  },
  about: {
    en: `Driven by curiosity, technology, and the desire to solve real problems, I am always in search of constant evolution. 
    I find true satisfaction in transforming data into solutions that make a difference—whether for businesses, communities, or individuals. 
    I believe that success in Data Science and Artificial Intelligence comes from the combination of collaboration, practice, and continuous learning.
    
    With feet on the ground and eyes looking forward, I seek to grow and, at the same time, open doors for those who, like me, believe that technology is also a tool for inclusion, transformation, and the future.`,
    pt: `Movido pela curiosidade, pela tecnologia e pelo desejo de resolver problemas reais, estou sempre em busca de evolução constante. 
    Encontro verdadeira satisfação em transformar dados em soluções que fazem a diferença — seja para empresas, comunidades ou indivíduos. 
    Acredito que o sucesso na Ciência de Dados e na Inteligência Artificial vem da combinação de colaboração, prática e aprendizado contínuo.
    
    Com os pés no chão e os olhos voltados para frente, busco crescer e, ao mesmo tempo, abrir portas para aqueles que, como eu, acreditam que a tecnologia também é uma ferramenta de inclusão, transformação e futuro.`
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
    title: { en: "Synthetic Image Detection", pt: "Detecção de Imagens Sintéticas" },
    category: "Computer Vision & AI",
    subtitle: { en: "ViT + Edge-Based Processing", pt: "ViT + Processamento de Bordas" },
    date: "12/2025",
    tags: ["PyTorch", "HuggingFace", "Computer Vision", "ViT"],
    description: {
      en: "Training and fine-tuning Vision Transformers (ViT ImgNet21k) to classify real vs. synthetic images on the CIFAKE dataset. Implemented Edge-Based Processing (EBP) for structural analysis based on high frequencies.",
      pt: "Treinamento e ajuste fino de Vision Transformers (ViT ImgNet21k) para classificar imagens reais vs. sintéticas no dataset CIFAKE. Implementação de Processamento Baseado em Bordas (EBP) para análise estrutural."
    },
    url: "https://medium.com/@jeova.anderson/combinando-vision-transformers-e-an%C3%A1lise-de-bordas-ebp-para-detectar-imag%C3%A9ns-sinteticas-8d5142ae1623"
  },
  {
    title: { en: "Customer Segmentation", pt: "Segmentação de Clientes" },
    category: "Business Intelligence",
    subtitle: { en: "RFM + K-means Clustering", pt: "RFM + Clusterização K-means" },
    date: "04/2025",
    tags: ["Python", "K-Means", "RFM", "Plotly", "Dash"],
    description: {
      en: "Real data cleaning from Wolt database. Feature engineering using RFM (Recency, Frequency, Monetary) analysis associated with K-means clustering to group users by behavioral patterns. Interactive dashboard deployment.",
      pt: "Limpeza de dados reais da base Wolt. Engenharia de atributos usando análise RFM (Recência, Frequência, Monetário) associada ao K-means para agrupar usuários por padrões comportamentais. Deploy de dashboard interativo."
    },
    url: "https://medium.com/@jeova.anderson/segmenta%C3%A7%C3%A3o-de-clientes-com-rfm-k-means-4e75c98f00d9"
  },
  {
    title: { en: "Churn Prediction Dashboard", pt: "Previsão de Churn" },
    category: "Business Intelligence",
    subtitle: { en: "End-to-End Analytics", pt: "Analytics Ponta a Ponta" },
    date: "04/2025",
    tags: ["SQL", "Pandas", "Random Forest", "Dash"],
    description: {
      en: "SQL data extraction and preprocessing. Pattern identification with Pandas and churn prediction using Random Forest. Visualized via an iterative dashboard built with Dash & Plotly.",
      pt: "Extração e pré-processamento via SQL. Identificação de padrões com Pandas e previsão de churn usando Random Forest. Visualizado através de um dashboard iterativo construído com Dash & Plotly."
    },
    url: "https://medium.com/@jeova.anderson/3-dashboards-1-objetivo-prevendo-e-evitando-churn-com-random-forest-d729f9b289a4"
  },
  {
    title: { en: "Jiu-Jitsu ELO Rating System", pt: "Sistema ELO para Jiu-Jitsu" },
    category: "Sports Analytics",
    subtitle: { en: "Web Scraping & Statistics", pt: "Web Scraping & Estatística" },
    date: "06/2025",
    tags: ["Web Scraping", "Python", "K-Means", "Statistics"],
    description: {
      en: "Analyzed over 56k fight records. Automated data collection via BJJ Heroes. Applied ELO rating algorithms and K-Means to cluster athletes into distinct technical profiles.",
      pt: "Análise de mais de 56k registros de lutas. Coleta automatizada via BJJ Heroes. Aplicação de algoritmos ELO e K-Means para agrupar atletas em perfis técnicos distintos."
    },
    url: "https://medium.com/@jeova.anderson/do-xadrez-ao-jiu-jitsu-usando-o-elo-rating-para-identificar-o-melhor-e-mapear-perfis-de-eca8950df773"
  }
];

export const EXPERIENCE = [
  {
    company: "Vsoft Tecnologia",
    role: { en: "Corporate Governance Intern", pt: "Estagiário de Governança Corporativa" },
    period: "07/2025 - 12/2025",
    description: [
      { en: "Development and maintenance of the company's RAG system for internal documentation.", pt: "Desenvolvimento e manutenção do sistema RAG da empresa para documentação interna." },
      { en: "Participated in creating the corporate chatbot 'Vivi'.", pt: "Participação na criação do chatbot corporativo 'Vivi'." },
      { en: "Implemented email automation scripts for contract management.", pt: "Implementação de scripts de automação de e-mail para gestão de contratos." },
      { en: "Built integrated dashboards for Corporate Governance metrics.", pt: "Criação de dashboards integrados para métricas de Governança Corporativa." }
    ]
  },
  {
    company: "Arquivo dos Governadores",
    role: { en: "Intern", pt: "Estagiário" },
    period: "01/2024 - 12/2024",
    description: [
      { en: "Organization and digitization of historical documents.", pt: "Organização e digitalização de documentos históricos." },
      { en: "Created pivot tables for data systematization.", pt: "Criação de tabelas dinâmicas para sistematização de dados." },
      { en: "Improved workflow for collection counting and classification using Excel.", pt: "Melhoria no fluxo de trabalho para contagem e classificação de acervo usando Excel." }
    ]
  },
  {
    company: "Marcos Inácio Advogados",
    role: { en: "Administrative Assistant", pt: "Assistente Administrativo" },
    period: "04/2021 - 08/2021",
    description: [
      { en: "Controlled material entry/exit and coordinated deliveries.", pt: "Controle de entrada/saída de materiais e coordenação de entregas." },
      { en: "Implemented efficient organization systems to optimize office resource management.", pt: "Implementação de sistemas eficientes de organização para otimizar a gestão de recursos do escritório." }
    ]
  }
];

export const SKILLS = [
  {
    category: { en: "Languages", pt: "Linguagens" },
    items: ["Python (Pandas, NumPy, Scikit-learn, TensorFlow)", "SQL"]
  },
  {
    category: { en: "Data Analysis", pt: "Análise de Dados" },
    items: ["Big Data Handling", "Exploratory Analysis", "Visualization (Matplotlib, Seaborn, Plotly)"]
  },
  {
    category: { en: "Machine Learning", pt: "Machine Learning" },
    items: ["Predictive Modeling", "Supervised Learning", "Unsupervised Learning", "Generative AI"]
  },
  {
    category: { en: "Data Engineering", pt: "Engenharia de Dados" },
    items: ["Web Scraping", "APIs", "ETL Pipelines"]
  },
  {
    category: { en: "Tools", pt: "Ferramentas" },
    items: ["Streamlit", "Git", "Power BI", "Excel", "Dash", "Looker Studio"]
  }
];

export const EDUCATION = [
  {
    institution: "Universidade Estadual da Paraíba (UEPB)",
    degree: { en: "Technologist in Data Science", pt: "Tecnólogo em Ciência de Dados" },
    period: { en: "Conclusion 06/2026", pt: "Conclusão 06/2026" },
    details: { en: "Full scholarship via selection process.", pt: "Bolsista integral via processo seletivo." }
  }
];

export const UI_TEXT = {
  nav: {
    about: { en: "About", pt: "Sobre" },
    work: { en: "Work", pt: "Projetos" },
    skills: { en: "Skills", pt: "Skills" },
    lab: { en: "Lab", pt: "Lab" },
    resume: { en: "Resume", pt: "Currículo" },
    contact: { en: "Contact", pt: "Contato" },
  },
  hero: {
    scroll: { en: "Initiate Descent", pt: "Iniciar Descida" },
    active: { en: "System Active", pt: "Sistema Ativo" }
  },
  about: {
    section: { en: "01. / PROFILE", pt: "01. / PERFIL" },
    title: { en: "The Human", pt: "O Humano" },
    subtitle: { en: "Behind the Data", pt: "Por trás dos Dados" },
    focus: { en: "Primary Focus", pt: "Foco Principal" },
    based: { en: "Based In", pt: "Baseado em" },
    remote: { en: "Available Remote", pt: "Disponível Remoto" },
    exp: { en: "Experience", pt: "Experiência" },
    years: { en: "3+ Years", pt: "3+ Anos" }
  },
  projects: {
    section: { en: "02. / ARCHIVE", pt: "02. / ARQUIVO" },
    title: { en: "Research & Protocols", pt: "Pesquisa & Protocolos" },
    interact: { en: "Interact to Analyze Data", pt: "Interaja para Analisar" },
    files: { en: "FILES", pt: "ARQUIVOS" }
  },
  skills: {
    section: { en: "03. / CAPABILITIES", pt: "03. / CAPACIDADES" },
    title: { en: "Technical Stack", pt: "Stack Técnico" }
  },
  lab: {
    section: { en: "04. / DECOMPRESSION", pt: "04. / DESCOMPRESSÃO" },
    title: { en: "Take a Break.", pt: "Dê uma Pausa." },
    subtitle: { en: "Interactive Physics Sandbox", pt: "Sandbox de Física Interativa" },
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
    download: { en: "Download Data", pt: "Baixar Dados" },
    education: { en: "Education", pt: "Educação" },
    experience: { en: "Experience Log", pt: "Registro de Experiência" }
  },
  contact: {
    signal: { en: "Signal detected.", pt: "Sinal detectado." },
    title: { en: "Let's Collaborate.", pt: "Vamos Colaborar." },
    system: { en: "System Nominal", pt: "Sistema Nominal" },
    rights: { en: "All rights reserved.", pt: "Todos os direitos reservados." }
  }
};
