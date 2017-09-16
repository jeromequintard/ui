# Composant

**Importer Translation**  
```javascript
import { Translation } from 'components';
```

**Importer les traductions pour le composant**  
```javascript
import locales from './composant.local.json';
```

**Ajouter un Oid pour le composant**  

Ajouter l'Oid dans un fichier manifest du type composant.manifest.js.

```javascript
export const oid = 'iki78f9a7e';
```

**Importer l'Oid**  
```javascript
import { oid } from './composant.manifest';
```

**Décorer la classe**  
```javascript
const Composant = class Composant extends Component {  
  render() {
    // La fonction t gère les traductions
    const { t } = this.props;

    return (
      // Réalise l'affichage de la traduction
      // l'objet n'est pas obligatoire
      <div>{t('hello', {'name':'Jérôme'})}/div>
    )
  }
}

// On décore la classe de la méthode Translation
export default Translation(locales, componentOid)(Composant);
```
# locale.json
```javascript
{
  "en-US": {
    "hello": "Hi {name}"
  },
  "fr-FR": {
    "hello": "Bonjour {name}",
  },
}
```