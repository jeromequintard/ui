import React from 'react';
import { createSelector, Selector } from 'reselect';

// Obtient la langue actuelle
const getCurrentLanguage = state => state.Translation.currentLanguage;
// Obtient les traductions
const getLocales = state => state.Translation.locales;

// Remplace les paramètres d'une chaine de caractères
// par les valeurs du même nom exemple :
// t{'hello',{nom: 'Jérôme'}} avec 'hello' : 'Bonjour {nom}'
// on obtient comme retour Bonjour Jérôme
const replaceString = (string, data = {}) => {
  // Pour chaque élément de l'objet
  for (const prop in data) {
    // On s'assure que prop est bien une propriété non prototypée
    // de l'object (requis par eslint)
    if ({}.hasOwnProperty.call(data, prop)) {
      // On remplace tous les opuces de {valeur}
      const regex = new RegExp(`{\\s*${prop}\\s*}`, 'gmi');
      // Par la valeur indiquée dans data
      string = string.replace(regex, data[prop]);
    }
  }
  return string;
};

// Obtient une chaine de caractère depuis les traductions disponibles
const getLocalizedString = (key, locales, data, oid) => {
  // Si aucune traduction pour la langue courante
  if (locales === undefined) return key;
  // On cherche la chaîne dans le tableau
  const localizedString = locales[key] || `${key}`;
  // On retourne la chaîne
  return replaceString(localizedString, data);
};

// Obtient les traductions pour un oid
const getOidLocales = (oid) => {
  // On créé un sélecteur
  return createSelector(
    // A partir de la langue
    getCurrentLanguage,
    // Et des traductions
    getLocales,
    (currentLanguage, locales) => {
      // On récupère les traductions pour le composant en cours et pour la langue
      return (locales[oid] !== undefined) ? locales[oid][currentLanguage] : {};
    },
  );
};

export const models = (state, oid) => {
  // On récupère les traductions
  const locales = getOidLocales(oid)(state);

  // On retourne différentes propriétés et la méthode "t"
  return {
    currentLanguage: state.Translation.currentLanguage,
    locales,
    t: (key, data) => getLocalizedString(key, locales, data, oid),
  };
};
