import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { inputSearchStyle } from '../styles/style';
import { SearchProp } from '../types/type';



const Search: React.FC<SearchProp> = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={inputSearchStyle.background}>
      <TextInput
        style={inputSearchStyle.input}
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
      <Feather name="search" style={inputSearchStyle.iconStyle} />
    </View>
  );
};

export default Search;
