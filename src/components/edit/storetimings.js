import React from 'react';
class StoreTimings extends React.Component {
	constructor(props){
		super(props);	
		this.state = {
			days: 		 {"Monday": [{"close": 2259, "open": 830}], "Tuesday": [{"close": 1259, "open": 830}, {"close": 2259, "open": 1400}], "Friday": [{"close": 2259, "open": 830}], "Wednesday": [{"close": 2259, "open": 830}], "Thursday": [{"close": 2259, "open": 830}], "Sunday": [{"close": 2259, "open": 830}], "Saturday": [{"close": 2259, "open": 830}]}	
		};
	}	

	formatTimings(time){
		time = Math.floor(time/100) + ':' + (time%100 === 0 ? '00' : time%100)
		return time 
	}
	// getDays(day, index){
	// 	{Ob<div style={styles.outerDivStyle} key={index}><div style={styles.circleStyle}>{day.substring(0,2)}</div> {days[day].map(timing=><div>{this.formatTimings(timing.open)} <span>{this.getMeridiem(timing.open)}</span><span> to</span> {this.formatTimings(timing.close)} <span>{this.getMeridiem(timing.close)}</span></div>)}</div>)}     

	// }
	getMeridiem(time){
		var meridiem = 'AM'
		if (time/1200 > 0){
			meridiem = 'PM'
		}
		return meridiem
	}
	changeStoreTime()
	{
		debugger;
		this.setState({
			"days" : {"Monday": [{"close": 2259, "open": 930}], "Tuesday": [{"close": 1259, "open": 830}, {"close": 2259, "open": 1400}], "Friday": [{"close": 2259, "open": 830}], "Wednesday": [{"close": 2259, "open": 830}], "Thursday": [{"close": 2259, "open": 830}], "Sunday": [{"close": 2259, "open": 830}], "Saturday": [{"close": 2259, "open": 830}]}	
		});
	}
	render(){
		const selectOptions = ['All days', 'Weekdays', 'Weekends']
		const styles = {
			addTimingsDivStyle:{
				position:'fixed',
				height: 200,
				top: 0,
				width: '100%',
				backgroundColor: 'white',
				boxShadow: '1px 1px 1px rgba(0,0,0,0.65)'
			},
			scrollableDivStyle: {
				paddingTop: 200
			},
			outerDivStyle: {
				padding: 20,
				borderBottom:'1px solid gray'
			},
			circleStyle: {
				height: 40,
				width: 40,
				borderRadius: '100%',
				backgroundColor: '#76d1f2',
				lineHeight: "40px",
				textAlign: 'center'
			}
		};
		const days = this.state.days;
		return (<div id="store-timings">
					<div style={styles.addTimingsDivStyle} key={1}><div key={3}>
						<select>{selectOptions.map((option, index)=><option key={index}>{option}</option>)}</select>
						<div> 
							<input type="number"></input> to <input type="number"></input>
							<button onclick={this.changeStoreTime.bind(this)}>Change</button>
						</div>
					</div>
					</div>
						<div key={2} style={styles.scrollableDivStyle}> 
                		{Object.keys(days).map((day,index)=><div style={styles.outerDivStyle} key={index}><div style={styles.circleStyle}>{day.substring(0,2)}</div> {days[day].map((timing,index)=><div key={index}>{this.formatTimings(timing.open)} <span>{this.getMeridiem(timing.open)}</span><span> to</span> {this.formatTimings(timing.close)} <span>{this.getMeridiem(timing.close)}</span></div>)}</div>)}     
            		</div>
            	</div>);
	}
}
export default StoreTimings;