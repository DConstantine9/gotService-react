import React, { Component } from 'react'
import GotService from '../../services/gotService'
import ErrorMessage from '../error'
import ItemList from '../itemList'
import ItemDetails, {Field} from '../itemDetails'
import RowBlock from "../rowBlock"

export default class CharacterPage extends Component {
  state = {
    selectedChar: "",
    error: false
  }

  gotService = new GotService()

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id 
    })
  }

  render() {
    
    if (this.state.error) {
      return <ErrorMessage />
    }

    const itemList = (
      <ItemList
        getData={this.gotService.getAllCharacters}
        onItemSelected={this.onItemSelected} 
        renderItem={item => `${item.name} (${item.gender})`}
      />
    )

    const personDetails = (
      <ItemDetails 
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
      >
        <Field field="gender" label="gender" />
        <Field field="born" label="born" />
        <Field field="died" label="died" />
        <Field field="culture" label="culture" />
      </ItemDetails>
    )

    return (
      <RowBlock left={itemList} right={personDetails} /> 
    )
  }
}
