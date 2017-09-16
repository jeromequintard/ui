import md5 from 'md5';
import queryString from 'query-string';

export default class GravatarApi {

  static getGravatar(email, size = 90) {
    if (email) {

      // Url d'appel
      const url = 'https://www.gravatar.com/avatar/';

      // On calcul le hash de l'email
      const hash = md5(email.trim().toLowerCase());

      // On définit les paramètres supplémentaires
      const params = queryString.stringify({
        s: size, // taile de l'image
        r: 'g', // uniquement les images tout publique
        d: 404, // renvoyer un 404 si aucune correspondance
      });

      // On fait appel à gravatar
      return fetch(`${url}${hash}?${params}`, {
        method: 'GET',
      })
      .then((response) => {
        if (Number(response.status) === 200) {
          return response.blob();
        }
        return null;
      })
      .then((blob) => {
        if (blob) {
          return URL.createObjectURL(blob);
        }
        return null;
      });
    }
    return null;
  }
}
