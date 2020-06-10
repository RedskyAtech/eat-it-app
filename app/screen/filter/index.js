import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './style';
import {Slider} from 'react-native-elements';
import * as utility from '../../utility/index';

export default class filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      free: false,
      paid: false,
      veg: false,
      nonVeg: false,
      homeMade: false,
      restaurant: false,
      value: 10,
      cost: '',
      type: '',
      from: '',
      min: 0,
      max: 0,
      screenFrom: '',
    };
  }
  componentDidMount = async () => {
    let from;
    if (this.props.navigation.state.params.from == 'name') {
      from = this.props.navigation.state.params.from;
    }
    await this.setState({screenFrom:from})
  };
  onFree = async () => {
    await this.setState({free: !this.state.free, paid: false});
    if (this.state.free) {
      await this.setState({cost: 'free'});
    } else {
      await this.setState({cost: ''});
    }
  };
  onPaid = async () => {
    await this.setState({free: false, paid: !this.state.paid});
    if (this.state.paid) {
      await this.setState({cost: 'paid'});
    } else {
      await this.setState({cost: ''});
    }
  };
  onVeg = async () => {
    await this.setState({
      veg: !this.state.veg,
      nonVeg: false,
    });
    if (this.state.veg) {
      await this.setState({type: 'veg'});
    } else {
      await this.setState({type: ''});
    }
  };
  onNonVeg = async () => {
    await this.setState({
      veg: false,
      nonVeg: !this.state.nonVeg,
    });
    if (this.state.nonVeg) {
      await this.setState({type: 'nonVeg'});
    } else {
      await this.setState({type: ''});
    }
  };
  onHomeMade = async () => {
    await this.setState({
      homeMade: !this.state.homeMade,
      restaurant: false,
    });
    if (this.state.homeMade) {
      await this.setState({from: 'homemade'});
    } else {
      await this.setState({from: ''});
    }
  };
  onRestaurant = async () => {
    await this.setState({
      homeMade: false,
      restaurant: !this.state.restaurant,
    });
    if (this.state.restaurant) {
      await this.setState({from: 'restaurant'});
    } else {
      await this.setState({from: ''});
    }
  };
  onBack = async () => {
    this.props.navigation.navigate('SearchName');
  };
  onNext = async () => {
    let filters = {};
    if (this.state.cost == 'paid') {
      if (utility.isFieldEmpty(this.state.min || this.state.max)) {
        alert('Please seletect minimum or maximum price');
        return;
      } else {
        filters = {
          cost: this.state.cost,
          type: this.state.type,
          from: this.state.from,
          minPrice: this.state.min,
          maxPrice: this.state.max,
        };
      }
    } else {
      filters = {
        cost: this.state.cost,
        type: this.state.type,
        from: this.state.from,
      };
    }
    console.log('from::::', filters);
    if(this.state.screenFrom=='name'){
      await this.props.navigation.state.params.refresh(filters);
    }else{
      await this.props.navigation.state.params.onCuisines(filters);
    }
    this.props.navigation.goBack();
  };
  render() {
    const {
      container,
      inner_container,
      thumb_style,
      spacing,
      bottom_container,
      input_box,
      forward_container,
      km_text,
      price_container,
      price_text,
      percentage,
      inner_heading,
      progress_bar,
      filter_box,
      row,
      filter_text,
      arrow,
      filter_container,
      filters,
      column,
      selected_color,
      unselected_color,
      heading_text,
      between_spacing,
      wrap_container,
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
            <Text style={heading_text}>Filters</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          <View style={[column, filter_box]}>
            <Text style={inner_heading}>Cost</Text>

            <View style={[row, filter_container]}>
              <TouchableOpacity onPress={this.onFree}>
                <View
                  style={
                    this.state.free
                      ? [filters, selected_color]
                      : [filters, unselected_color]
                  }>
                  <Text style={filter_text}>Free</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPaid}>
                <View
                  style={
                    this.state.paid
                      ? [filters, selected_color]
                      : [filters, unselected_color]
                  }>
                  <Text style={filter_text}>Paid</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[column, filter_box]}>
            <Text style={inner_heading}>Food type</Text>
            <View style={[row, filter_container]}>
              <TouchableOpacity onPress={this.onVeg}>
                <View
                  style={
                    this.state.veg
                      ? [filters, selected_color]
                      : [filters, unselected_color]
                  }>
                  <Text style={filter_text}>Veg</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onNonVeg}>
                <View
                  style={
                    this.state.nonVeg
                      ? [filters, selected_color]
                      : [filters, unselected_color]
                  }>
                  <Text style={filter_text}>Non-veg</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[column, filter_box]}>
            <Text style={inner_heading}>Food From</Text>
            <View style={[row, filter_container]}>
              <TouchableOpacity onPress={this.onHomeMade}>
                <View
                  style={
                    this.state.homeMade
                      ? [filters, selected_color]
                      : [filters, unselected_color]
                  }>
                  <Text style={filter_text}>Home made</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onRestaurant}>
                <View
                  style={
                    this.state.restaurant
                      ? [filters, selected_color]
                      : [filters, unselected_color]
                  }>
                  <Text style={filter_text}>Restaurant</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[column, filter_box]}>
            <Text style={inner_heading}>Distance</Text>
            <Slider
              value={this.state.value}
              thumbTintColor={'#FFBA09'}
              maximumTrackTintColor={'grey'}
              minimumTrackTintColor={'#FFBA09'}
              minimumValue={0}
              maximumValue={50}
              trackStyle={progress_bar}
              thumbStyle={thumb_style}
              onValueChange={value => this.setState({value: value})}
            />
            <View style={[row, between_spacing]}>
              <Text style={km_text}>0 km</Text>
              <Text style={[km_text, percentage]}>
                {this.state.value.toFixed(0)} km
              </Text>
              <Text style={km_text}>50 km</Text>
            </View>
          </View>

          {this.state.paid ? (
            <View style={[column, filter_box, filter_container]}>
              <Text style={inner_heading}>Cost</Text>
              <View style={[row, filter_container]}>
                <View style={price_container}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Min. cost"
                    placeholderTextColor={'#6A6A6A'}
                    style={input_box}
                    onChangeText={min => this.setState({min})}
                    value={this.state.min}
                  />
                </View>
                <View style={price_container}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Max. cost"
                    placeholderTextColor={'#6A6A6A'}
                    style={input_box}
                    onChangeText={max => this.setState({max})}
                    value={this.state.max}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>

        <View style={bottom_container}>
          <Text />
          <TouchableOpacity activeOpacity={1} onPress={this.onNext}>
            <View style={forward_container}>
              <Image
                resizeMode="contain"
                source={require('../../assets/next_button_arrow.png')}
                style={arrow}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
