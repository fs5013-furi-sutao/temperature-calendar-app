import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/scss/bootstrap.scss'; // Required!: yarn add sass-loader node-sass
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
moment.locale('ja');

/**
 * https://github.com/airbnb/react-dates
 */
class DatePick extends React.Component {

    BLOCKED_DATES = [
        moment().add(10, 'days'),
        moment().add(11, 'days'),
        moment().add(12, 'days'),
    ];

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: moment(),
            endDate: moment().add(7, 'days'),
            fullscreen: false,
            direction: 'left',
            dateFormat: 'YYYY/MM/DD/',
            small: false,
            block: false,
            orientation: 'horizontal',
            numMonths: 2,
            // minimumNights: 7

        };
        this.handleDatesChange = this.handleDatesChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleChangeFullscreen = this.handleChangeFullscreen.bind(this);
        this.handleChangeDirection = this.handleChangeDirection.bind(this);
        this.handleChangeDateFormat = this.handleChangeDateFormat.bind(this);
        this.handleIsDayBlocked = this.handleIsDayBlocked.bind(this);
    }

    handleDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    handleFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    handleChangeFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
    }

    handleChangeDirection(e) {
        this.setState({ direction: e.target.value });
    }

    handleChangeDateFormat(e) {
        this.setState({ dateFormat: e.target.value });
    }

    handleIsDayBlocked(day) {
        return this.BLOCKED_DATES.filter(d => d.isSame(day, 'day')).length > 0;
    }

    clickButton() {
        return this.props.dataHoge();
    }

    render() {
        return (
            <div style={{ padding: '10px' }}>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
                    displayFormat={this.state.dateFormat}
                    hideKeyboardShortcutsPanel={true}
                    numberOfMonths={this.state.numMonths || 2}
                    block={this.state.block}
                    small={this.state.small}
                    withFullScreenPortal={this.state.fullscreen}
                    anchorDirection={this.state.direction}
                    orientation={this.state.orientation}
                    minimumNights={this.state.minimumNights}
                    isDayBlocked={this.handleIsDayBlocked}
                    isOutsideRange={(day) => day.isAfter(moment().subtract(-365, 'days')) || day.isBefore(moment().subtract(365, 'days'))}
                />
            </div>
        );
    }
}

export default DatePick;