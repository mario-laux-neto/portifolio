// src/components/sections/About.js
"use client";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiLinux,
  SiGit,
  SiTailwindcss,
  SiBootstrap,
  SiChakraui,
} from "react-icons/si";
import { MdApi } from "react-icons/md";
import Image from "next/image";

const StyledAboutSection = styled.section`
  max-width: 900px;
  margin: 0 auto;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0px 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 30px;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xs};
      display: flex;
      align-items: center;

      .icon {
        position: absolute;
        left: 0;
        color: ${theme.colors.green};
        font-size: ${theme.fontSizes.md};
        top: 50%;
        transform: translateY(-50%);
      }

      &:before {
        display: none;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: block;
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 4px;

    &:hover {
      &:after {
        top: 15px;
        left: 15px;
      }
    }

    .img {
      position: absolute;
      border-radius: 4px;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      inset: 0;
      display: block;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid ${theme.colors.green};
      top: 20px;
      left: 20px;
      z-index: -1;
      border-radius: 4px;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
`;

const About = () => {
  const skills = [
    { name: "HTML", icon: <SiHtml5 className="icon" /> },
    { name: "CSS", icon: <SiCss3 className="icon" /> },
    { name: "JavaScript", icon: <SiJavascript className="icon" /> },
    { name: "React", icon: <SiReact className="icon" /> },
    { name: "Next.js", icon: <SiNextdotjs className="icon" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="icon" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="icon" /> },
    { name: "Chakra UI", icon: <SiChakraui className="icon" /> },
    { name: "API REST", icon: <MdApi className="icon" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="icon" /> },
    { name: "Linux", icon: <SiLinux className="icon" /> },
    { name: "Git", icon: <SiGit className="icon" /> },
  ];

  return (
    <StyledAboutSection id="about">
      <h2 className="numbered-heading">Sobre mim</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Sou um desenvolvedor apaixonado por transformar ideias em
              experiências digitais interativas e funcionais. Minha jornada
              profissional começou em funções administrativas e contábeis , onde
              desenvolvi uma base sólida em organização, gestão de dados e
              atenção aos detalhes. Essa experiência me deu uma perspectiva
              única sobre processos e a importância da precisão, mas minha
              paixão por resolver problemas de forma mais criativa me guiou para
              o universo da tecnologia. Hoje, curso Sistemas de Informação na
              Unochapecó para aprimorar essa nova direção.
            </p>

            <p>
              Atualmente, estou imerso no ecossistema de inovação do Pollen
              Parque Científico e Tecnológico, atuando como estagiário no Centro
              de Residência em Software. Meu dia a dia é focado em
              desenvolvimento web moderno, onde aplico na prática meus
              conhecimentos em
            </p>
          </div>

          <ul className="skills-list">
            {skills &&
              skills.map((skill, i) => (
                <li key={i}>
                  {skill.icon}
                  {skill.name}
                </li>
              ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Image
              src="/headshot.jpeg"
              alt="Foto de perfil"
              className="img"
              fill
              sizes="(max-width: 768px) 70vw, 300px"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
