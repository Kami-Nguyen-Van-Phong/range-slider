import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './home.css';
import RangeSlide from '../component/range-slider/RangeSlide';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            setValue: this.handleSetValue
        }
    }
    handleSetValue = (value) => {
        this.setState({
            value
        });
    }
    handleInputChange = (event) => {
        this.setState({
            value: event.target.value === '' ? '' : Number(event.target.value)
        })
    };

    handleBlur = () => {
        if (this.state.value < 0) {
            this.setState({
                value: 0
            })
        } else if (this.state.value > 10) {
            this.setState({
                value: 10
            })
        }
    };
    render() {
        return (
            <div>
                <RangeSlide values={this.state} max={10} min={0} />\

                <Input
                    className='range-slide-input'
                    value={this.state.value}
                    margin="dense"
                    onChange={(event) => this.handleInputChange(event)}
                    onBlur={() => this.handleBlur()}
                    inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        // pattern:"{0,10}"
                    }}
                    variant="outlined"
                />
            </div>
        )
    }
}

export default Home
