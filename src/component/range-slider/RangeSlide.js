import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import './RangeSlide.css';


export class RangeSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: 0,

        }
    }

    componentDidUpdate(prevProps) {
        //Lấy độ dài màn hình hiện tại
        const sliderWidth = document.getElementById("ruler").offsetWidth;
        // Lấy giá trị max, min của slider
        const maxSlider = this.props.max;
        const minSlider = this.props.min;
        //Lấy giá trị trước khi thay đổi của con trỏ
        const prevValue = prevProps.values.value;
        //Lấy giá trị hiện tại của con trỏ
        const currentValue = this.props.values.value;
        //Set lại vị trí cho con trỏ
        if (currentValue !== prevValue) {
            const point = (currentValue - minSlider) * (sliderWidth / (maxSlider - minSlider))
            this.setState({
                point
            });
        }
    }

    handleWindowResize = () => {
        //Lấy độ dài màn hình hiện tại
        const sliderWidth = document.getElementById("ruler").offsetWidth;
        // Lấy giá trị max, min của slider
        const maxSlider = this.props.max;
        const minSlider = this.props.min;
        //Lấy giá trị hiện tại của con trỏ
        const currentValue = this.props.values.value;
        
        const point = (currentValue - minSlider) * (sliderWidth / (maxSlider - minSlider))
        this.setState({
            point
        });

    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleSliderChange = (event) => {
        // this.props.value.setValue(newValue);
        const numberOfButton = this.props.max - this.props.min;
        const sliderWidth = document.getElementById('ruler').offsetWidth;
        const point = event.clientX;
        const space = sliderWidth / numberOfButton;

        let nearPoint = Math.round(point / space) * space;
        if (point > 0 && point <= sliderWidth) {
            this.setState({
                point: nearPoint
            });
            const newValue = Math.ceil(numberOfButton * (nearPoint / sliderWidth));
            this.props.values.setValue(newValue);
        }
    };

    handleMounseClick = () => {
        document.addEventListener('mousemove', this.handleSliderChange);
        document.addEventListener('mouseup', this.handleMounseUp)
    }

    handleMounseUp = () => {
        document.removeEventListener('mousemove', this.handleSliderChange);
        document.removeEventListener('mouseup', this.handleMounseUp);
    }

    render() {
        const { value } = this.props.values
        return (
            <div className='range-slide-root'>
                <div id='ruler' className='ruler'>
                    <div id='point' style={{ left: this.state.point }} className='point' onMouseDown={this.handleMounseClick}></div>

                </div>
            </div>
        )
    }
}

export default RangeSlide

