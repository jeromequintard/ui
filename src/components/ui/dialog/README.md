# Propriétés Composant

|Propriété|Attendu|Valeur par défaut|Description|
|-|-|-|-|
|className|Stylx|null|Styles CSS|
|closeAnim|CloseAnim|CloseAnim.Slide|Animation de fermeture|
|openAnim|OpenAnim|OpenAnim.Slide|Animation d'ouverture|
|width|Size|500px|Largeur du dialogue|

## Enums

### OpenAnim

|Valeur|Description|
|-|-|
|Fade|Fondu|
|Slide|Glissé du haut vers le bas|
|Scale|Effet d'agrandissement|
|Bounce|Effet de rebondi|

### CloseAnim

|Valeur|Description|
|-|-|
|Fade|Fondu|
|Slide|Glissé du bas vers le haut|
|Scale|Effet de reduction|

## Actions Redux

|Action|Type|Arguments|Description|
|-|-|-|-|
|show|SHOW|Object, String|Affiche la boîte de dialogue|
|hide|HIDE||Cache une boîte de dialogue|

## Paramètres de la méthode Show

|Paramètre|Type|Requis ?|Valeur par défaut|Description|
|-|-|-|-|-|
|message|String|Oui||Message affiché dans la boîte de dialogue|
|title|String|Non||Titre affiché dans la boîte de dialogue|
|actions|Object|Non|Voir actions|Liste des actions associés au dialogue|

### Actions

Une action peut correspondre à un objet disposant des paramètres suivants ou une action (onClick) à appeler. Dans ce dernier cas, les options par défaut des paramètres ci-dessous sont utilisées. L'ordre des actions définit l'ordre d'affichage.

|Paramètre|Type|Requis ?|Valeur par défaut|Description|
|-|-|-|-|-|
|onClick|func|Oui||Fonction au clic sur le bouton|
|status|enum|Non|Success (1)|Status du bouton|
|icon|string|Non|success (2)|Icon du bouton|

1. Voir documentation bouton
2. Voir documentation icônes

### Exemples

Affichage d'un message simple avec un seul paramètre de type string.

```javascript
dialog.show('Ceci est un message');
```

Affichage d'un message simple avec un objet.

```javascript
dialog.show({
  message: 'Ceci est un message',
});
```

Affichage d'un message avec un objet et des actions.

```javascript
dialog.show({
  message: 'Ceci est un message',
  title: 'Fermer',
  actions: {
    Cancel: {
      onClick: this.cancelResult,
      status: 'Critical',
      icon: 'danger',
    },
    Ok: this.okResult,
  },
});
```


