<template>
  <div class="impressum-wrap">
    <div class="impressum-container">
      <button class="back-btn" @click="$emit('close')">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Zurück zur Startseite
      </button>

      <!-- Impressum -->
      <section class="legal-section">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 ECG</h2>
        <p>
          Diese Website entstand im Rahmen eines Lehrprojekts im Studiengang an der
          <strong>University of Applied Sciences Upper Austria</strong> im Kurs
          <strong>Human Factors in AI</strong>.
        </p>
        <p>Es handelt sich um ein nicht-kommerzielles Studienprojekt ohne Erwerbsabsicht.</p>

        <h2>Projektmitglieder</h2>
        <ul>
          <li>Vanessa Maurer — <a href="mailto:s2410892020@fhooe.at">s2410892020@fhooe.at</a></li>
          <li>Marina Beck — <a href="mailto:s2410892007@fhooe.at">s2410892007@fhooe.at</a></li>
          <li>Desiree Aichstill — <a href="mailto:s2410892003@fhooe.at">s2410892003@fhooe.at</a></li>
          <li>Nathalie Döberl — <a href="mailto:s2410892010@fhooe.at">s2410892010@fhooe.at</a></li>
        </ul>

        <p class="contact-note">
          Bei Fragen zum Projekt, zur Funktionsweise oder zur Meldung technischer Probleme
          wende dich bitte per E-Mail an eines der Projektmitglieder.
        </p>
      </section>

      <hr class="divider" />

      <!-- Datenschutzerklärung -->
      <section class="legal-section">
        <h1>Datenschutzerklärung</h1>

        <p>
          Der Schutz deiner personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung
          informiert dich darüber, welche Daten beim Besuch von WasteLense verarbeitet werden
          und auf welcher Grundlage dies geschieht.
        </p>

        <h2>Verantwortliche</h2>
        <p>
          Verantwortlich für die Datenverarbeitung im Sinne der DSGVO sind die oben genannten
          Projektmitglieder (Vanessa Maurer, Marina Beck, Desiree Aichstill) als gemeinsam
          Verantwortliche gemäß Art. 26 DSGVO. Für Datenschutzanfragen wende dich per E-Mail
          an eine der oben angeführten Adressen.
        </p>

        <h2>Verarbeitete Datenkategorien</h2>

        <h3>Bilder (Abfallfotos)</h3>
        <p>
          Wenn du ein Foto eines Abfallartikels hochlädst oder aufnimmst, wird dieses Bild
          ausschließlich lokal in deinem Browser verarbeitet. Es findet keine Übertragung des
          Bildes an einen Server statt. Nach dem Schließen oder Neuladen der Seite werden alle
          Bilddaten automatisch aus dem Arbeitsspeicher gelöscht. Es erfolgt keine dauerhafte
          Speicherung.
        </p>

        <h3>Zugriffsdaten / Server-Logs</h3>
        <p>
          Beim Abruf der Website verarbeitet der Hosting-Anbieter technisch notwendige
          Verbindungsdaten (IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene URL, verwendeter
          Browser). Diese Daten werden ausschließlich zur Sicherstellung des Betriebs
          gespeichert und nicht mit anderen Daten verknüpft.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren
          Betrieb der Website).
        </p>

        <h2>Rechtmäßigkeit der Verarbeitung</h2>

        <h3>Verarbeitung der Abfallfotos</h3>
        <p>
          Die lokale Verarbeitung deines Fotos erfolgt auf Grundlage deiner Einwilligung
          gemäß Art. 6 Abs. 1 lit. a DSGVO — du lädst das Bild aktiv hoch und löst die
          Analyse selbst aus. Da keine Übertragung stattfindet, verlassen deine Bilddaten
          deinen Browser zu keinem Zeitpunkt.
        </p>

        <h3>Studienprojekt / berechtigte Interessen</h3>
        <p>
          Der Betrieb dieser Website dient ausschließlich dem Zweck der Erfüllung einer
          universitären Lehrveranstaltung. Ein kommerzielles Interesse besteht nicht.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h2>Eingebundene Dienste Dritter</h2>
        <p>
          Diese Website bindet keine Dienste Dritter ein. Alle Ressourcen — Schriftarten
          (Lora, DM Sans), das KI-Modell sowie die Programmbibliotheken für die
          Bildklassifizierung (TensorFlow.js, Teachable Machine) — werden direkt vom
          Hosting-Server dieser Website ausgeliefert. Es werden keine Inhalte von externen
          Servern (etwa Google Fonts oder Content-Delivery-Netzwerke) nachgeladen. Dadurch
          wird beim Aufruf der Website keine IP-Adresse an Dritte übertragen.
        </p>

        <h2>Speicherdauer</h2>
        <p>
          Hochgeladene Bilder werden nicht gespeichert — sie existieren ausschließlich für
          die Dauer der aktiven Browser-Sitzung im Arbeitsspeicher. Server-Logs des
          Hosting-Anbieters werden üblicherweise nach 30 Tagen automatisch gelöscht.
        </p>

        <h2>Weitergabe von Daten</h2>
        <p>
          Eine Weitergabe personenbezogener Daten an Dritte erfolgt nicht. Eine Nutzung
          zu Werbezwecken oder ein Verkauf von Daten findet nicht statt.
        </p>

        <h2>Keine automatisierte Entscheidungsfindung</h2>
        <p>
          Das KI-Modell von WasteLense trifft keine rechtlich verbindlichen Entscheidungen.
          Die Klassifizierung von Abfall ist eine Empfehlung ohne rechtliche Wirkung.
          Ein Profiling deiner Person findet nicht statt.
        </p>

        <h2>Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit und Widerspruch. Da wir keine personenbezogenen
          Daten dauerhaft speichern, sind die meisten dieser Rechte faktisch bereits erfüllt.
          Für Anfragen wende dich an eine der oben genannten E-Mail-Adressen.
        </p>
        <p>
          Wenn du der Ansicht bist, dass die Verarbeitung deiner Daten gegen das
          Datenschutzrecht verstößt, hast du das Recht, bei der zuständigen Aufsichtsbehörde
          Beschwerde einzulegen:
        </p>
        <address>
          Österreichische Datenschutzbehörde<br />
          Barichgasse 40–42, 1030 Wien<br />
          Telefon: +43 1 52 152-0<br />
          E-Mail: <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a><br />
          Web: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>
        </address>

        <p class="stand">Stand: April 2026</p>
      </section>

      <hr class="divider" />

      <!-- Datenquellen -->
      <section class="legal-section">
        <h1>Verwendete Datensätze</h1>
        <p>
          Das KI-Modell von WasteLense wurde auf Basis öffentlich verfügbarer Datensätze
          von Kaggle trainiert. Die Datensätze stehen unter ihren jeweiligen Lizenzen
          und sind über folgende Links abrufbar:
        </p>
        <ul class="dataset-list">
          <li>
            <a href="https://www.kaggle.com/datasets/hassnainzaidi/garbage-classification?resource=download" target="_blank" rel="noopener">
              Garbage Classification — Hassnain Zaidi
            </a>
          </li>
          <li>
            <a href="https://www.kaggle.com/datasets/wasifmahmood01/custom-waste-classification-dataset" target="_blank" rel="noopener">
              <!-- Datensatz-Titel ergänzen -->
              Custom Waste classification dataset — Wasif Mahmood
            </a>
          </li>
          <li>
            <a href="https://www.kaggle.com/datasets/preetishah/waste-classificationorganic-and-recyclable" target="_blank" rel="noopener">
              <!-- Datensatz-Titel ergänzen -->
              Waste classification(organic and recyclable) — Preeti Shah
            </a>
          </li>
        </ul>
        <p class="own-sources-note">
          Alle weiteren auf dieser Website verwendeten Bilder, die nicht aus den
          oben genannten Datensätzen stammen, wurden aus eigenen Quellen erstellt.
        </p>

        <h2>Quelle der Entsorgungsregeln</h2>
        <p>
          Die in WasteLense angezeigten Entsorgungsregeln basieren auf den
          Trennhinweisen des oberösterreichischen Landesabfallverbands
          (<a href="https://www.umweltprofis.at/allgemein/wissenswertes/abfalltrennung.html" target="_blank" rel="noopener">umweltprofis.at</a>).
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.impressum-wrap {
  background: var(--cream);
  min-height: 100vh;
  padding: 60px 24px 100px;
}

.impressum-container {
  max-width: 720px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--forest-mid);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 48px;
  transition: color 0.2s;
}
.back-btn:hover {
  color: var(--forest);
}

.legal-section {
  margin-bottom: 48px;
}

h1 {
  font-family: 'Lora', serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--forest);
  margin-bottom: 28px;
  letter-spacing: -0.02em;
}

h2 {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--forest);
  margin-top: 32px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.78rem;
}

h3 {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  margin-top: 20px;
  margin-bottom: 6px;
}

p {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 12px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

ul li {
  font-size: 0.95rem;
  color: var(--ink);
}

a {
  color: var(--forest-mid);
  text-decoration: underline;
  text-underline-offset: 3px;
}
a:hover {
  color: var(--forest);
}

address {
  font-style: normal;
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.8;
  background: var(--cream-deep);
  border-radius: 10px;
  padding: 16px 20px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.contact-note {
  font-size: 0.88rem;
  color: var(--muted);
  margin-top: 12px;
}

.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 48px 0;
}

.stand {
  font-size: 0.82rem;
  color: oklch(65% 0.02 80);
  margin-top: 32px;
}

.dataset-list {
  margin-top: 16px;
}

.dataset-list li {
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}
.dataset-list li:last-child {
  border-bottom: none;
}

.own-sources-note {
  margin-top: 20px;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
