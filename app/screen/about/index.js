import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';

export default class about extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onBack = async () => {
    await this.props.navigation.navigate('tab5');
  };

  render() {
    const {
      container,
      column,
      list_height,
      row,
      between_spacing,
      inner_container,
      spacing,
      arrow,
      heading_text,
      content_container,
      bottom_margin,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[inner_container, row, between_spacing, spacing]}>
            <TouchableOpacity onPress={this.onBack}>
              <Image
                resizeMode="contain"
                source={require('../../assets/back_arrow.png')}
                style={arrow}
              />
            </TouchableOpacity>
            <Text style={heading_text}>About Eat it</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          {/* <View style={list_height}> */}
          <View style={[list_height, column, content_container, bottom_margin]}>
            <Text>
              Yellow Leaf Hammocks tells users about its product by describing
              how the hammocks empower artisan weavers and their families. The
              company breaks down different pieces of the story into sections
              that combine words and easily digestible graphics, painting a
              picture instead of big chunks of text. They're clear about why
              they're different: "Not a Charity," the page reads. And then:
              "This is the basis for a brighter future, built on a hand up, not
              a handout." Every company has a story to tell, so break out your
              storytelling skills from that random English class you took years
              ago and put them to work on your "About Us" page. Using
              descriptive and emotive copy and gorgeous graphics, an "About Us"
              page with a story works harder for your business than a generic
              one.
            </Text>
            <Text>
              Yellow Leaf Hammocks tells users about its product by describing
              how the hammocks empower artisan weavers and their families. The
              company breaks down different pieces of the story into sections
              that combine words and easily digestible graphics, painting a
              picture instead of big chunks of text. They're clear about why
              they're different: "Not a Charity," the page reads. And then:
              "This is the basis for a brighter future, built on a hand up, not
              a handout." Every company has a story to tell, so break out your
              storytelling skills from that random English class you took years
              ago and put them to work on your "About Us" page. Using
              descriptive and emotive copy and gorgeous graphics, an "About Us"
              page with a story works harder for your business than a generic
              one.
            </Text>
          </View>
          {/* </View> */}
        </View>
      </View>
    );
  }
}
