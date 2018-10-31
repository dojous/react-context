import React from 'react';
export const labels = {
    en: {
        themeSelectLabel: 'Toggle theme',
        langSelectLabel: 'Select language',
        body: 'Showing &{number} movies in database',
        error: 'No records in dataBase'
    },
    fr: {
        themeSelectLabel: 'Toggle theme',
        langSelectLabel: 'Choisir la langue',
        body: "Affichage &{number} des films dans la base de données.",
        error: 'No records in dataBase FR'
    },
    sp: {
        themeSelectLabel: 'Alternar tema',
        langSelectLabel: 'Seleccione el idioma',
        body: 'Mostrando &{number} películas en la base de datos',
        error: 'No records in dataBase SP'
    },
    gr: {
        themeSelectLabel: 'Thema umschalten',
        langSelectLabel: 'Sprache auswählen',
        body: '&{number} Filme in der Datenbank anzeigen',
        error: 'No records in dataBase GR'
    },
    hn: {
        langSelectLabel: 'भाषा चुनिए',
        themeSelectLabel: 'विषय टॉगल करें',
        body: 'डेटाबेस में फिल्में दिखा रहा है',
        error: 'No records in dataBase HN'
    }
}
const LangContext = React.createContext(labels.fr);
export default LangContext;