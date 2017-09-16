 # Validation d'un formulaire
 
```javascript
onFormChange(isvalid) {
  console.info(`Form is valid : ${isvalid}`);
}

onSubmit(model) {
  const username = model.username;
  const password = model.password;
}

<Form onSubmit={this.onSubmit} onChange={this.onChange}>
  
  // Exemple avec un message d'erreur par règle
  <Textinput name="username" placeholder="username" validatorsRules={['required', 'email']} validatorsErrors={{ required: 'Requis', email: 'Pas un e-mail' }} />
  
  // Exemple avec un validateur comprenant un paramètre
  <Textinput name="password" placeholder="password" validatorsRules={['required', { minlength:5 }]} validatorsError="Erreur" type="Password" />

</Form>
```

## Propriétés Form

|Propriété|Attendu|Retour|Description|
|-|-|-|-|
|onSubmit|Event|Object|Evènement déclenché au submit du formulaire et uniquement si le formulaire est valide. En retour renvoi la liste des valeurs pour chaque composant|
|onChange|Event|Bool|Evènement déclenché lors l'état du formulaire change. En retour envoi la validité du formulaire|
|onContentChange|Event||Evènement déclenché lors que le contenu du formulaire change.|

## Méthodes statiques Form

|Méthode|Attendu|Retour|Description|
|-|-|-|-|
|addRule|String,Func|N/A|Ajouter une règle définie par son nom (String) et une fonction de validation (Func)|

```javascript
Form.addRule('isJerome', (values, value) => { value === 'Jerome'});
```

## Propriétés Composant

|Propriété|Attendu|Retour|Description|
|-|-|-|-|
|validatorsRules|Array||Tableau des règles à vérifier|
|validatorsErrors|Array||Tableau des messages par règle|
|validatorsError|String||Message global si aucun validatorsErrors|
|onValid|Event|mixed|Lorsque le composant devient valide renvoi la valeur|

**Note** le composant doit supporter la validation (voir chapire concernée).

## Validateurs

|Validateur|Paramètre|Description|
|-|-|-|-|
|required||Renvoi true si la valeur est vide ou null|
|empty||Renvoi true si la valeur est vide|
|istrue||Renvoi true si la valeur vaut true|
|isfalse||Renvoi false si la valeur vaut false|
|minlength|length|Renvoi true si la valeur à une longueur minimum de length|
|maxlength|length|Renvoi true si la valeur à une longueur maximum de length|
|rangelength|range|Renvoi true si la valeur est entre [ 1, 2 ]|
|equals|value|Renvoi true si la valeur est équale à value|
|equalsField|Field|Renvoi true si la valeur est égale à celle du champ 'password'|
|match|Pattern|Renvoi true si la valeur match le pattern regexp donné|
|numeric||Renvoi true si la valeur est numérique (0-9)|
|alphanumeric||Renvoi true si la valeur est alphanumérique (a-Z0-9)|
|email||Renvoi true si la valeur est un e-mail|

# Composant

Pour pouvoir être compatible, un composant doit être décoré du composant Validator et définir quelques appels :

```javascript
import { Validator } from 'components';

const MonComposant = class MonComposant extends Component {
  componentWillMount() {
    this.props.validator.componentMount(this,'foo');
  }

  onChange(value) {
    this.props.validator.validate(value);
  }

  onModelChange(model) {

  }

  render() {
    const errorMessage = this.props.validator.getErrorMessage();

    return(
      ...
    )
  }
};

export default Validator(MonComposant);
```
## Méthodes

|Methode|Attendu|Retour|Description|
|-|-|-|-|
|componentMount|this,[mixed]||Ajoute le composant à la validation, le second paramètre optionel donne la valeur par défaut|
|componentUnmount|this||Supprime le composant de la validation (obligatoire si HMR est activé)|
|validate|mixed||Valide la valeur par rapport aux règles indiqués. Attention cependant au type de valeur qui doit etre en correspondance avec les règles existantes|
|getErrorMessages||Array|Renvoi une liste des erreurs de validation|
|getErrorMessage||String|Renvoi la première erreur rencontrée|

## Evènement

|Evènement|Paramètres|Description|
|-|-|-|-|
|onModelChange|Object|Fournit le model reçu par le formulaire| 

## Etats

|Etat|Type|Description|
|-|-|-|
|isValid|Bool|True si le composant est valide|
|displayFormErrors|Bool|True si le formulaire demande d'afficher intentionnellement l'erreur (ex. au submit)|

