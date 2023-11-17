import React from "react";
import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import image from "../components/finale.png";

function AboutUs() {
  const backHome = () => {
    window.location.href = "http://localhost:3000/home";
  };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <img src={image} alt="Finale" />
      <Timeline className="m-5">
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>Ottobre 2023</Timeline.Time>
            <Timeline.Title>
              Viene "partorita" l'idea di un Cucina Compartida...
            </Timeline.Title>
            <Timeline.Body>
              Cucina Compartida è un social che permette agli utenti di
              caricaricare post dei locali dove è possibile, cenare, pranzare o
              fare aperitivo.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>Ottobre 2023</Timeline.Time>
            <Timeline.Title>Iniziano i lavori!</Timeline.Title>
            <Timeline.Body>
              Iniziano i lavori per la realizzazione del mio Capstone e del
              Social.{" "}
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>Novembre 2023</Timeline.Time>
            <Timeline.Title> Lo scopriremo solo vivendo!</Timeline.Title>
            <Timeline.Body>
              I lavori al sito continuano... E chissà a come andrà a finire.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>

      <svg
        class="w-8 h-8 items-center justify-center cursor-pointer p-1 mb-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        onClick={backHome}
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
        />
      </svg>
    </div>
  );
}

export default AboutUs;
