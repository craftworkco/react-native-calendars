import _ from 'lodash';
import XDate from 'xdate';
import dateutils from '../../dateutils';
import {xdateToData} from '../../interface';
import {DATE_FORMATS} from '../Consts';

const commons = require('../commons');
const TOP_POSITION = 65;

class Presenter {
  _isPastDate(date) {
    const today = XDate();
    const d = XDate(date);

    if (today.getFullYear() > d.getFullYear()) {
      return true;
    }
    if (today.getFullYear() === d.getFullYear()) {
      if (today.getMonth() > d.getMonth()) {
        return true;
      }
      if (today.getMonth() === d.getMonth()) {
        if (today.getDate() > d.getDate()) {
          return true;
        }
      }
    }
    return false;
  }

  _getIconDown = () => {
    return '../../img/down.png';
  };

  _getIconUp = () => {
    return '../../img/up.png';
  };

  getButtonIcon = (date, showTodayButton = true) => {
    if (!showTodayButton) {
      return undefined;
    }
    const iconPath = this._isPastDate(date) ? this._getIconDown() : this._getIconUp();
    return require(iconPath);
  };

  setDate = (props, date, newDate, updateState, updateSource) => {
    const sameMonth = dateutils.sameMonth(XDate(date), XDate(newDate));
    const buttonIcon = this.getButtonIcon(date, props.showTodayButton);

    updateState(buttonIcon);

    _.invoke(props, 'onDateChanged', date, updateSource);

    if (!sameMonth) {
      _.invoke(props, 'onMonthChange', xdateToData(XDate(date)), updateSource);
    }
  };

  setDisabled = (showTodayButton, newDisabledValue, oldDisabledValue, updateState) => {
    if (!showTodayButton || newDisabledValue === oldDisabledValue) {
      return;
    }
    updateState(newDisabledValue);
  };

  shouldAnimateTodayButton = props => {
    return props.showTodayButton;
  };

  _isToday = date => {
    const today = XDate().toString(DATE_FORMATS.yyyy_MM_DD);
    return today === date;
  };

  getTodayDate = () => {
    return XDate().toString(DATE_FORMATS.yyyy_MM_DD);
  };

  getPositionAnimation = (date, todayBottomMargin) => {
    const toValue = this._isToday(date) ? TOP_POSITION : -todayBottomMargin || -TOP_POSITION;
    return {
      toValue,
      tension: 30,
      friction: 8,
      useNativeDriver: true
    };
  };

  shouldAnimateOpacity = props => {
    return props.disabledOpacity;
  };

  getOpacityAnimation = (props, disabled) => {
    return {
      toValue: disabled ? props.disabledOpacity : 1,
      duration: 500,
      useNativeDriver: true
    };
  };

  getTodayFormatted = () => {
    const todayString = XDate.locales[XDate.defaultLocale].today || commons.todayString;
    const today = todayString.charAt(0).toUpperCase() + todayString.slice(1);
    return today;
  };
}

export default Presenter;
