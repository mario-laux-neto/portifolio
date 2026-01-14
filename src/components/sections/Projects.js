// src/components/sections/Projects.js
"use client";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import Link from "next/link";
import {
  FaGithub,
  FaEye,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";

const StyledProjectsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const StyledTitle = styled.h2`
  font-size: clamp(24px, 5vw, 32px);
  margin: 0 0 50px 0;
  color: ${theme.colors.lightestSlate};
  font-weight: 600;
`;

const StyledCategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPreview = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 25, 47, 0.9);
  color: ${theme.colors.lightestSlate};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out;

  h4 {
    font-size: ${theme.fontSizes.md};
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: ${theme.fontSizes.sm};
      margin: 5px 0;
    }
  }
`;

const StyledCategoryCard = styled.div`
  background-color: ${theme.colors.lightNavy};
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(2, 12, 27, 0.2);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 25px rgba(2, 12, 27, 0.4);
  }
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.lightestSlate};
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const StyledCardTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .icon {
    color: ${theme.colors.green};
    font-size: 1.5rem;
  }
`;

const StyledCardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${theme.colors.lightSlate};
  flex-grow: 1;
`;

const StyledCardActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 0.75rem;
  margin-top: auto;

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    padding: 0.75rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.8rem;
    text-align: center;
    min-height: 44px;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    svg {
      font-size: 1rem;
      flex-shrink: 0;
    }
  }

  .btn-github {
    background-color: ${theme.colors.lightNavy};
    color: ${theme.colors.lightSlate};
    border-color: ${theme.colors.green};
  }

  .btn-github:hover {
    background-color: ${theme.colors.green};
    color: ${theme.colors.lightestNavy};
    border-color: ${theme.colors.green};
  }

  .btn-preview {
    background-color: ${theme.colors.lightSlate};
    color: ${theme.colors.navy};
    border-color: transparent;
    cursor: pointer;
  }

  .btn-preview:hover {
    background-color: ${theme.colors.slate};
    color: ${theme.colors.navy};
    border-color: transparent;
  }

  .btn-live {
    background-color: ${theme.colors.green};
    color: ${theme.colors.lightestNavy};
    border-color: ${theme.colors.green};
  }

  .btn-live:hover {
    background-color: ${theme.colors.lightGreen};
    border-color: ${theme.colors.lightGreen};
  }

  /* Responsividade para cards com 3 botões */
  &.three-buttons {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;

    a:nth-child(3) {
      grid-column: 1 / -1;
    }
  }

  /* Responsividade para cards com 2 botões */
  &.two-buttons {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;

    a {
      font-size: 0.85rem;
      padding: 0.8rem;
    }
  }
`;

const StyledCardButton = styled.a`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  background-color: ${theme.colors.green};
  color: ${theme.colors.lightestNavy};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${theme.colors.lightGreen};
    transform: scale(1.1);
  }
`;

const StyledCardBottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: ${theme.colors.blue};
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const StyledModalContent = styled.div`
  background-color: ${theme.colors.lightNavy};
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  /* Estilo da barra de rolagem */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.navy};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.green};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.lightGreen};
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.green} ${theme.colors.navy};
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.colors.navy};

  h3 {
    color: ${theme.colors.lightestSlate};
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const StyledCloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.lightSlate};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.lightestSlate};
    background-color: ${theme.colors.navy};
  }
`;

const StyledCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const StyledCarouselImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.navy};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.lightSlate};
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => props.$translateX}%);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: ${theme.colors.navy};
  }
`;

const StyledCarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(100, 255, 218, 0.1);
  border: 2px solid ${theme.colors.green};
  color: ${theme.colors.green};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: ${theme.colors.green};
    color: ${theme.colors.lightestNavy};
  }

  &.prev {
    left: 15px;
  }

  &.next {
    right: 15px;
  }
`;

const StyledCarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
`;

const StyledIndicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) =>
    props.$active ? theme.colors.green : theme.colors.lightSlate};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};

  &:hover {
    background-color: ${theme.colors.green};
    opacity: 1;
  }
`;

const StyledModalDescription = styled.div`
  padding: 1.5rem;
  color: ${theme.colors.lightSlate};
  line-height: 1.6;

  h4 {
    color: ${theme.colors.lightestSlate};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;

    span {
      background-color: ${theme.colors.navy};
      color: ${theme.colors.green};
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dados dos projetos com imagens
  const projectsData = {
    "delive-express": {
      title: "DeliveExpress",
      description:
        "Sistema completo de delivery com interface moderna, gerenciamento de pedidos e integração com APIs de pagamento.",
      images: [
        "/images/deliveexpress/login.png", // Substitua pelos seus caminhos
        "/images/deliveexpress/cadastro.png",
        "/images/deliveexpress/home.png",
        "/images/deliveexpress/produtos.png",
        "/images/deliveexpress/cupons.png",
        "/images/deliveexpress/carrinho.png",
        "/images/deliveexpress/endereco.png",
        "/images/deliveexpress/pagamento.png",
        "/images/deliveexpress/finalizar.png", // Adicione mais imagens conforme necessário
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    },
    "coins-for-study": {
      title: "Coins For Study",
      description:
        "Plataforma gamificada para incentivar estudos, com sistema de recompensas e acompanhamento de progresso.",
      video: "/videos/deliveexpress-demo.mp4",
      images: [],
      technologies: ["React", "Firebase", "Chart.js", "Material-UI"],
    },
    "sistema-vacinacao": {
      title: "Sistema Controle de Vacinação",
      description:
        "Sistema robusto para controle e gerenciamento de campanhas de vacinação com relatórios e dashboard administrativo.",
      images: [
        "/images/pig/home.png",
        "/images/pig/login.png",
        "/images/pig/senha.png",
        "/images/pig/gereusu.png",
        "/images/pig/cadvacinas.png",
        "/images/pig/form1.png",
        "/images/pig/form2.png",
        "/images/pig/excel.png",
        "/images/pig/atividade.png",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "Express"],
    },
    "novo-projeto": {
      title: "Massoterapia Novo",
      description: `Este projeto consiste no redesign completo e refatoração do site institucional da massoterapeuta Maria Laux.

Originalmente desenvolvido por mim no início de 2025 como meu primeiro projeto de estudo, a versão anterior (Legacy) cumpria seu papel, mas carecia de polimento visual e otimização técnica. Esta nova versão (v2.0) marca minha evolução como desenvolvedor, transformando uma página simples em uma ferramenta de negócios profissional.`,
      images: [
        "/images/massoterapia-novo/imagem1.png",
        "/images/massoterapia-novo/imagem2.png",
        "/images/massoterapia-novo/imagem3.png",
        "/images/massoterapia-novo/imagem4.png",
      ],
      technologies: ["Tailwind CSS", "JavaScript", "HTML 5"],
    },
  };

  const openModal = (projectKey) => {
    setSelectedProject(projectsData[projectKey]);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <StyledProjectsSection id="projects">
      <StyledTitle className="numbered-heading">Projetos</StyledTitle>

      <StyledCategoriesGrid>
        <StyledCategoryCard>
          <StyledCardContent>
            <StyledCardTitle>DeliveExpress</StyledCardTitle>
            <StyledCardDescription>
              Sistema completo de delivery com interface moderna, gerenciamento
              de pedidos e integração com APIs de pagamento.
            </StyledCardDescription>
            <StyledCardActions className="two-buttons">
              <Link
                href="https://github.com/usuario/delive-express"
                className="btn-github"
              >
                <FaGithub /> Repositório
              </Link>
              <button
                onClick={() => openModal("delive-express")}
                className="btn-preview"
              >
                <FaEye /> Prévia
              </button>
            </StyledCardActions>
            <StyledCardBottomBar />
          </StyledCardContent>
        </StyledCategoryCard>

        <StyledCategoryCard>
          <StyledCardContent>
            <StyledCardTitle>Coins For Study</StyledCardTitle>
            <StyledCardDescription>
              Plataforma gamificada para incentivar estudos, com sistema de
              recompensas e acompanhamento de progresso.
            </StyledCardDescription>
            <StyledCardActions className="two-buttons">
              <Link
                href="https://github.com/usuario/coins-for-study"
                className="btn-github"
              >
                <FaGithub /> Repositório
              </Link>
              <button
                onClick={() => openModal("coins-for-study")}
                className="btn-preview"
              >
                <FaEye /> Prévia
              </button>
            </StyledCardActions>
            <StyledCardBottomBar />
          </StyledCardContent>
        </StyledCategoryCard>

        <StyledCategoryCard>
          <StyledCardContent>
            <StyledCardTitle>Sistema Controle de Vacinação</StyledCardTitle>
            <StyledCardDescription>
              Sistema robusto para controle e gerenciamento de campanhas de
              vacinação com relatórios e dashboard administrativo.
            </StyledCardDescription>
            <StyledCardActions className="two-buttons">
              <Link
                href="https://github.com/usuario/sistema-vacinacao"
                className="btn-github"
              >
                <FaGithub /> Repositório
              </Link>
              <button
                onClick={() => openModal("sistema-vacinacao")}
                className="btn-preview"
              >
                <FaEye /> Prévia
              </button>
            </StyledCardActions>
            <StyledCardBottomBar />
          </StyledCardContent>
        </StyledCategoryCard>

        {/* Novo card com botão de Site */}
        <StyledCategoryCard>
          <StyledCardContent>
            <StyledCardTitle>Massoterapia Novo</StyledCardTitle>
            <StyledCardDescription>
              Redesign completo de site institucional com interface moderna e
              responsiva com HTML5 Semântico, Tailwind CSS e JavaScript.
            </StyledCardDescription>
            <StyledCardActions className="three-buttons">
              <Link
                href="https://github.com/mario-laux-neto/site-massoterapia-novo"
                className="btn-github"
              >
                <FaGithub /> Repositório
              </Link>
              <button
                onClick={() => openModal("novo-projeto")}
                className="btn-preview"
              >
                <FaEye /> Prévia
              </button>
              <Link
                href="https://maria-laux-massoterapeuta.netlify.app/"
                className="btn-live"
              >
                <FaExternalLinkAlt /> Site
              </Link>
            </StyledCardActions>
            <StyledCardBottomBar />
          </StyledCardContent>
        </StyledCategoryCard>
      </StyledCategoriesGrid>

      {/* Modal com Carrossel */}
      {selectedProject && (
        <StyledModal onClick={closeModal}>
          <StyledModalContent onClick={(e) => e.stopPropagation()}>
            <StyledModalHeader>
              <h3>{selectedProject.title}</h3>
              <StyledCloseButton onClick={closeModal}>
                <FaTimes />
              </StyledCloseButton>
            </StyledModalHeader>

            {selectedProject.video ? (
              <div style={{ padding: "1rem" }}>
                <video
                  src={selectedProject.video}
                  controls
                  style={{
                    width: "100%",
                    maxWidth: 720,
                    height: "auto",
                    maxHeight: 360,
                    borderRadius: 8,
                    backgroundColor: theme.colors.navy,
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>
            ) : (
              <>
                <StyledCarousel>
                  {selectedProject.images.map((image, index) => (
                    <StyledCarouselImage
                      key={index}
                      $translateX={(index - currentImageIndex) * 100}
                    >
                      <img
                        src={image}
                        alt={`${selectedProject.title} - Imagem ${index + 1}`}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div style={{ display: "none", fontSize: "1rem" }}>
                        Imagem {index + 1}
                      </div>
                    </StyledCarouselImage>
                  ))}

                  {selectedProject.images.length > 1 && (
                    <>
                      <StyledCarouselButton
                        className="prev"
                        onClick={prevImage}
                      >
                        <FaChevronLeft />
                      </StyledCarouselButton>
                      <StyledCarouselButton
                        className="next"
                        onClick={nextImage}
                      >
                        <FaChevronRight />
                      </StyledCarouselButton>
                    </>
                  )}
                </StyledCarousel>

                {selectedProject.images.length > 1 && (
                  <StyledCarouselIndicators>
                    {selectedProject.images.map((_, index) => (
                      <StyledIndicator
                        key={index}
                        $active={index === currentImageIndex}
                        onClick={() => goToImage(index)}
                      />
                    ))}
                  </StyledCarouselIndicators>
                )}
              </>
            )}

            <StyledModalDescription>
              <h4>Sobre o Projeto</h4>
              <p>{selectedProject.description}</p>

              <div className="tech-stack">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </StyledModalDescription>
          </StyledModalContent>
        </StyledModal>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
