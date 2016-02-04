import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {AutoComplete} from 'material-ui/lib';
import Checkbox from 'material-ui/lib/checkbox';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';

const categories = ['Computer Accessories','UPS','Inverter','Software Company','Gym','Accomodation','Accountant', 'Acupuncture', 'Addiction Rehabilitation Centre', 'Adventure Sports', 'Advertising Agency', 'Aerobics', 'After-School Programme', 'Airbrushing', 'Air Compressor Repair', 'Air Conditioning', 'Air Duct Cleaning', 'Air Filters', 'Air Hostess Training Institute', 'Airline Booking', 'Airport Hotel', 'Airport Shuttle', 'Allergist', 'Ambulance', 'Amusement Park', 'Animal Feed', 'Animal Hospital', 'Animation Institute', 'Aquarium', 'Architect', 'Arena', 'Army School', 'Art Gallery', 'Artificial Jewelry', 'Artist', 'Arts and Crafts', 'Art School', 'Art supplies', 'Ashram', 'Auditor', 'Auditorium', 'Auto Accessories', 'Auto Electricals', 'Auto Seat Cover', 'Ayurvedic Doctor', 'Ayurvedic Hospital', 'Baby Clothing', 'Baby Store', 'Badminton Court', 'Bags', 'Bakery', 'Ballet School', 'Bangles', 'Banner', 'Banquet Hall', 'Barber', 'Bar and Restaurant', 'Baskets', 'Bathroom Renovator', 'Beach Resort', 'Beauty Parlour', 'Beauty Products', 'Bed & Breakfast', 'Bedding Store', 'Beverage', 'Bicycle Rental', 'Bicycles', 'Bike Rentals', 'Bike Repairs', 'Bird Store', 'Bistro', 'Blood Bank', 'Boarding School', 'Boating Club', 'Boat Tour', 'Body Piercing', 'Books', 'Bottled Water', 'Boutique', 'Bowling Alley', 'Brewery', 'Bridal Store', 'Building Materials', 'Bus Rentals', 'Bus Ticket', 'Cable TV', 'Cafe', 'Cakes', 'Camera', 'Camera Repair', 'Candles', 'Car Body Parts', 'Car Dealer', 'Cardiologist', 'Career Consultant', 'Car Insurance', 'Carpenter', 'Carpet Cleaner', 'Carpets', 'Car Rental', 'Car Service', 'Car Upholstery', 'Car Wash', 'Caterer', 'Catering', 'Cement Dealer', 'Chartered Accountant', 'Chemist', 'Childcare', 'Child Care Centre', "Children's Books", "Children's Clothing", 'Childrens Hospital', 'Chiropractor', 'Chocolates', 'Cinema', 'Circus', 'Cleaning', 'Clinic', 'Clock Repairs', 'Clothing', 'Coaching Center', 'Cocktail Bar', 'Coffee', 'Cold Storage', 'Collectables', 'College', 'Comic Books', 'Community College', 'Computer Hardware', 'Computer Networking', 'Computers', 'Computer Training Institute', 'Concert Hall', 'Condiments', 'Contact Lenses', 'Contractor', 'Convention Centre', 'Convent School', 'Cooking Class', 'Corporate Lawyer', 'Cosmetics', 'Costume Rental', 'Counsellor', 'Couriers', 'Crafts', 'Cruise', 'Curtains', 'Custom T-shirt', 'Cutlery', 'Dairy', 'Dairy Products', 'Day Boarding School', 'Dental Surgeon', 'Dentist', 'Departmental Store', 'Dermatologist', 'Designer Clothing', 'Dhaba', 'Diabetologist', 'Diagnostics', 'Dialysis Centre', 'Dietician', 'Digital Printer', 'Disco', 'Distance Learning Center', 'Dolls', 'Doughnut', 'Drama School', 'Driving School', 'Dry Cleaning', 'Dry Fruits', 'Educational Loan', 'Egg', 'Electrical Accessories', 'Electrical Repairs', 'Electricals', 'Electrical Wires & Cables', 'Electronics', 'Electronics Accessories', 'Electronics Repairs', 'Embroidery', 'Emergency Service', 'Endocrinologist', 'Endodontist', 'Engineering College', 'English Classes', 'Entertainment Agency', 'Environmental Consultant', 'Espresso Bar', 'Event Management','Eye Hospital', 'Fabrication', 'Fabric Store', 'Facial Spa', 'Family Counselling', 'Family Planning', 'Fancy Dress', 'Farm Equipment', 'Fashion Designer', 'Fashion Institute', 'Fashion Photographer', 'Fax', 'Fertility Clinic', 'Fertility Doctor', 'Fertilizers', 'Festive Gifts', 'Film & Television', 'Financial Advisor', 'Financial Institution', 'Fine Dining', 'Fire Proofing', 'Fire Station', 'Fireworks', 'First Aid', 'Fishing Equipment', 'Fitness Centre', 'Fitness Equipment', 'Flooring', 'Florist', 'Flour Mill', 'Food and Drink', 'Food Court', 'Function Room Facility', 'Funeral Home', 'Furnished Apartment', 'Furniture', 'Furniture Maker', 'Furniture Rentals', 'Furniture Repairs', 'Game Store', 'Garage', 'Garden Products', 'Gastroenterologist', 'General Insurance', 'Generators', 'Geyser', 'Gift', 'Glass & Mirror', 'Go Karting', 'Gold Jeweler', 'Golf Club', 'Golf Course', 'Golf Resort', 'GPS Dealer', 'Granites and Marbles', 'Graphic Design', 'Guest House', 'Guitar', 'Gymnastics', 'Gynaecologist', 'Haematologist', 'Hair Care', 'Hairdresser', 'Handicrafts', 'Hardware', 'Hats', 'Healing Therapy', 'Healthy Foods', 'Herbal Products', 'Hobby', 'Holistic Medicine', 'Home Appliances', 'Home Insurance', 'Home Loan', 'Home Stay', 'Hostel', 'Hotel', 'Hotel Management', 'House Cleaning','Ice Cream', 'ICSE School', 'Imax Cinema', 'Immunologist', 'Insurance Agency', 'Interior Decoration', 'International School', 'Internet Cafe','IT security', 'Jackets', 'Jewellery', 'Juice Bar', 'Kanchipuram Saree', 'Karaoke Bar', 'Karate School', 'Kindergarden', 'Kitchen Appliances', 'Kitchen Designer', 'Kitchenware', 'Ladies Tailor', 'Lamp Repairs', 'Language Classes', 'Law College', 'Lawyer', 'Leather Accessories', 'Leather Cleaning', 'Library', 'Life Insurance', 'Lift Company', 'Lightings', 'Loans', 'Lodge', 'LPG Fitment Center', 'Luggage', 'Luggage Repairs', 'Luxury Car Rentals', 'Luxury Hotel', 'Marbles', 'Marketing Agency', 'Marketing Consultancy', 'Marriage Consultancy', 'Martial Arts', 'Massage', 'Maternity Centre', 'Matrimony', 'Medical Examiner', 'Medical Insurance Agency', 'Meditation Class', "Men's Clothing", "Men's Hostel", 'Mens Tailor', 'Microwave Repairs', 'Mobile Phone', 'Mobile Phone Repairs', 'Modelling Agency', 'Modular Kitchen', 'Montessori School', 'Musical Instruments', 'Music Sckenool', 'Music Store', 'Namkeens', 'Natural Foods', 'Nephrologist', 'Neurologist','Nightclub', 'Nursery School', 'Nursing College', 'Nut', 'Nutritionist', 'Obstetrician', 'Office Equipments', 'Office Rentals', 'Office Services', 'Office supplies', 'Old Age Home', 'Oncologist', 'Ophthalmologist', 'Organic Foods', 'Orthodontist', 'Packers & Movers', 'Painting Class', 'Paints', 'Party Equipment Rentals', 'Party Planner', 'Pastry', 'Pathologist', 'Pediatrician', 'Perfumes', 'Periodontist', 'Pest Control', 'Pesticides', 'Pet Adoption', 'Pet Care', 'Pet Store', 'Photographer', 'Photo Lab', 'Physiatrist', 'Physical Therapist', 'Physician', 'Physiotherapy Center', 'Pipe Dealer', 'Pizza', 'Plastic Furniture', 'Play School', 'Plumber', 'Plywood', 'Polytechnic College', 'Pottery', 'Pregnancy Care', 'Pre-school', 'Primary School', 'Printer Repairs', 'Printing', 'Private Hospital', 'Private Tutor', 'Psychiatric Clinic', 'Psychiatrist', 'Psychologist', 'Psychotherapist', 'Pub', 'Public Library', 'Public school', 'Public Transport', 'Publisher', 'Pulmonologist', 'Radiator Repairs', 'Radiologist', 'Radio Station', 'Radio & Television Advertising Agency', 'Radio Tower', 'Rafting Club', 'Railway Ticket Agent', 'Ranching', 'Real Estate', 'Recreation Centre', 'Recruitment Agency', 'Refrigerator Repairs', 'Rehabilitation Centre', 'Reiki Therapist', 'Resort', 'Rheumatologist', 'Rock Climbing', 'Roofing\tSolutions', 'Roofing Supplies', 'Rugs', 'Safe & Vault', 'Salads', 'Salon', 'Sandwiches', 'Sarees', 'School', 'School For The Deaf', 'School Uniforms', 'Screen Printers', 'SCUBA Diving', 'Sculptures', 'Self Defence School', 'Service Apartment', 'Serviced Accommodation', 'Sewing Machine Repair', 'Sexologist', 'Shawls', 'Shoes', 'Shopping Centre', 'Skin Care', 'Snooker and Pool Club', 'Sofas', 'Solar Energy Equipment', 'Souvenirs','Speech and Hearing Specialist', 'Spices', 'Sporting Goods', 'Sports', 'Sports Academy', 'Sports Bar', 'Sports Club', 'Sports School', 'Sportswear', 'Stationery', 'Steak House', 'Structural Engineer', 'Sunglasses', 'Supermarket', 'Sweets', 'Swimming Club', 'Swimming Coaching Center', 'Swimming Pool', 'Swimming Pool Repair and Maintenance', 'Swimwear', 'Synagogue', 'Tabla Instructor', 'Table Tennis Club', 'Tailor','Tattoo Studio', 'Tax Consultant', 'Taxis', 'Tea', 'Teacher', 'Technical College', 'Telephones', 'Television Repairs', 'Tennis Club', 'Tennis Court', 'Tent House', 'Thai Massage Therapist', 'Therapists', 'Threads & Yarns', 'Tiffins', 'Tiles', 'Title Company', 'Tour Operator', 'Tours', 'Tours and Travels', 'Towing Service', 'Toys', 'Tractor Repairs', 'Training Centre', 'Travel Agents', 'Travel Insurance Agency', 'Trichologist', 'Tubewell Contractor', 'Typewriter Repairs', 'Typist', 'Tyre Manufacturer', 'Tyres', 'Unani Clinic', 'Upholsterer', 'Upholstery Cleaners', 'Urologist', 'Used Store', 'Utilities', 'Vacuum Cleaners', 'Van Rentals', 'Vascular Surgeon', 'Vastu Consultant', 'Veterinarian', 'Veterinary Care', 'Video Arcade', 'Video Equipments', 'Video Games', 'Vineyard', 'Vocal Instructor', 'Wallets', 'Wallpapers', 'Washing Machine & Dryer', 'Washing Machine & Dryer Repairs', 'Wastewater Treatment', 'Watches', 'Watch Repairs', 'Water Tank Cleaners', 'Water Treatment', 'Web Development', 'Web Hosting Provider', 'Wedding Accessories', 'Wedding Clothing', 'Wedding Photographer', 'Wedding Portrait Studio', 'Wedding Services', 'Weight Loss Center', 'Wellness Centre', 'Wheelchair Repairs', 'Wheelchairs', 'Wheel & Frame Alignment', 'Wheels', 'Window Cleaning', 'Window Installation', 'Window Tinting', 'Windscreen Repairs', 'Wines', "Women's College", "Women's Hostel", 'Yoga', 'Youth Hostel', 'Zoo','Seafood & Fishes','Broadband','Online','Staffing Solutions','Greeting Cards','NGO','Cafe','Part-Time Jobs','Chocolates','Courier & Logistics','Pharmacy','Gardening','Books','Cable Operator','Package Tours','Catering','Cleaning','Cargo Services','Water','Fast food and Snacks','Cobbler','Interior Designers','Driving School','Gifts and Stationery','Flowers','Photographers','Apparel','Painting','Transportation Services','Coconut Vendor','E Commerce Services','Wholesaler','Chats','Homeopathy Clinic','Personal Training','Others','Skill Development','Hardware','Optics','Newspaper','Footwear','Paying Guest','Gas','Fruits and Vegetables','Grocery','Dance and Music','Sports','Late night food','Meat','Bakery','Home made food','Restaurant','Milk','Health and Wellness','Pharmacy','Diagnostics','Ayurveda','Pet Care','Doctors','Dental Care','Canteen','Laundry','BillPayment'];
class Suggestions extends React.Component{
	constructor(props)
	{
		super(props);
        
	}
	render(){
		if(this.props.suggestions.length){
			let thisIndex = this.props.index;
			let suggestionMatches = this.props.suggestions[thisIndex];
			if(suggestionMatches && suggestionMatches.length){
			return (<div className="suggestionWrapper" >
			    {	                				
					suggestionMatches.map((sug, index) => {        			
						return (<div
									className="suggestion"
									onClick={this.props.onSuggestionSelect.bind(this,thisIndex,sug)}
							 		key={index}>
							 		{sug}
							 	</div>)	 
					})
				}                   
		    	</div>);
			}else{
				return (<div></div>);
			}
		}else{
			return (<div></div>);
		}
	}
	
}
let catChangeFlag = false;
class Category extends React.Component{
	constructor(props)
	{
		super(props);
        let suggestions = [];
        let categoryField = [];
        let selectedCategory = this.props.selectedCategory.split(',');
        this.state = {
        	suggestions: suggestions,
        	categoryField: categoryField,
        	selectedCategory: selectedCategory
        }
	}
	loadCategory(index,e){
		if(!catChangeFlag){
			this.props.manageSave('hidden');
			catChangeFlag = true;
		}
		let keyWord = e.target.value;
		if(keyWord.length){
			let selectedCategory = this.state.selectedCategory;
			let filterList = categories.filter((cat, index) => {
				if(selectedCategory.indexOf(cat)<0 && cat.substring(0,keyWord.length).toLowerCase().indexOf(keyWord.toLowerCase().trim())>=0){
					return cat;
				}
			});
			let suggestions = this.state.suggestions;
			let filterList2 = [];
			suggestions[index] = filterList;		
			let categoryField = this.state.categoryField;
			categoryField[index] = keyWord;
			//selectedCategory[index] = '';
			this.setState({
				suggestions:suggestions,
				categoryField:categoryField
			});
		}else{
			catChangeFlag = false;
			this.onSuggestionSelect(index,keyWord);
		}
		//console.log('cate',filterList);
	}
	onSuggestionSelect(index,sug){
		console.log('on suggestion select 1',index,sug);
		let suggestions = this.state.suggestions;
		suggestions[index] = [];
		let categoryField = this.state.categoryField;
		categoryField[index] = sug;
		let selectedCategory = this.state.selectedCategory;
		selectedCategory[index] = sug;
		this.setState({
			suggestions:suggestions,
			categoryField:categoryField,
			selectedCategory:selectedCategory
		},function(){
			let categoriesToSave = this.state.selectedCategory;
	        this.props.savedCategory(categoriesToSave);
		});
	}
	categoryOnblur(index,e){
		let _this = this;
		setTimeout(function(){ 
			let suggestions = _this.state.suggestions;
			let selectedCategory = _this.state.selectedCategory;
			let categoryField = _this.state.categoryField;
			categoryField[index] = selectedCategory[index] || categoryField[index];
			suggestions[index] = [];
			_this.setState({
				suggestions:suggestions,
				categoryField:categoryField
			});
			if(catChangeFlag){
				_this.props.manageSave('show');
				catChangeFlag = false;
			}
		},400);
	}
	categoryOnFocus(index,e){
		/*let offsetHeight = e.target.offsetHeight;
		console.log('e.target.offsetHeight',offsetHeight);
		let winY = window.scrollY;
		console.log('window',winY);
		window.scrollTo(0, winY-offsetHeight-100);*/
	}
	render(){
		let selectedCategory = this.state.selectedCategory;
		if(selectedCategory.length <= 4 && selectedCategory.indexOf('')<0){
			selectedCategory.push('');
		}
		return (<div>
		    {
        		selectedCategory.map((cat, index) => { 
        			let label = 'Category';
					if(index>=1){
						label = 'Additional Category '+(index);
					}       			
        			return (<div className="categoryWrapper" 
        					onBlur={this.categoryOnblur.bind(this,index)}
        					key={index}>
	        				<TextField fullWidth={true}
		                		floatingLabelText={label}                		
		                		defaultValue={cat}
		                		onChange={this.loadCategory.bind(this,index)}	
		                		onFocus={this.categoryOnFocus.bind(this,index)}
		                		value={this.state.categoryField[index] || cat}/>
			                	<Suggestions
			                		onSuggestionSelect={this.onSuggestionSelect.bind(this)}
			                		index={index} 
			                		suggestions={this.state.suggestions} />
                		</div>)	 
        		})
        	}                     
	    </div>);
	}
	
}
class Description extends React.Component {
	constructor(props){
		super(props);
		let businessPhone = [];
		if(this.props.bData.newExtras.businessPhone){
			businessPhone = this.props.bData.newExtras.businessPhone.split(',');
		}
		let errorText = {};
		this.state = {
            businessShortDescription: this.props.bData.businessType || '',
            businessLongDescription: this.props.bData.businessDescription || '',
            selectedBusinessCategory: this.props.bData.category,
            phoneLimit:5,
            phoneClass:[],
            businessPhone:businessPhone,
            languageType:this.props.bData.languageType,
            errorText: errorText,
            errorFlag: false
        };	
        this.state.phoneClass[0] = '';
        this.state.errorText['businessPhone'] = ['']
        for(let i=1;i<this.state.phoneLimit;i++){
        	this.state.phoneClass.push('hidden');
        }
        for(let i=1;i<this.state.businessPhone.length+1 && i<this.state.phoneLimit;i++){
        	this.state.phoneClass[i] = '';
        }
	}	
	languageTypeChange(e, index, languageType){
		this.setState({
			languageType:languageType
		},function(){
			this.props.manageSave('show','languageType',this.state.languageType);
		});
	}
	onBusinessShortDescUpdate(textField){
		this.state.businessShortDescription = textField.target.value;
		if(!this.state.businessShortDescription){
			let errorText = this.state.errorText;
			errorText['businessShortDescription'] = 'One line description is required';
			this.setState({
				errorText:errorText
			},function(){
				window.errorStack['businessShortDescription'] = {
					text: errorText['businessShortDescription'],
					tab: 0 
				};
				this.props.manageSave('hidden');
			});
		}else{
			if(this.state.errorText['businessShortDescription']){
				let errorText = this.state.errorText;
				errorText['businessShortDescription'] = '';
				delete window.errorStack['businessShortDescription'];
				this.setState({
					errorText:errorText
				});
			}			
			this.props.manageSave('updation');
		}
	}
	onBusinessLongDescUpdate(textField){
		this.state.businessLongDescription = textField.target.value;
		this.props.manageSave('updation');
	}
	onCategoryUpdate(dynamicVals){
		console.log('dynamicVals',dynamicVals);
		let selectedCategory = [];
		for (let item of dynamicVals) {
			selectedCategory.push(item.selectedCategory);
		}
		this.props.manageSave('show','selectedCategory',selectedCategory);
	}
	onBusinessPhoneChange(index,textField){
		console.log('onBusinessPhoneChange',index);
		this.state.businessPhone[index] = textField.target.value;
		this.props.manageSave('updation');
		if(textField.target.value.length>=6 && this.state.phoneLimit > index+1){
			let phoneClass = this.state.phoneClass;
			phoneClass[index+1] = '';
			this.setState({
				phoneClass : phoneClass
			});
		}else if(index>0 && textField.target.value.length == 0){
			let phoneClass = this.state.phoneClass;
			phoneClass[index] = 'hidden';
			this.setState({
				phoneClass : phoneClass
			});	
		}
	}
	onBusinessShortDescBlur(textField){
		this.setState({
			businessShortDescription:textField.target.value
		},function(){
			this.props.manageSave('show','businessType',this.state.businessShortDescription);
		});
	}
	onBusinessLongDescBlur(textField){
		this.setState({
			businessLongDescription:textField.target.value
		},function(){
			this.props.manageSave('show','businessDescription',this.state.businessLongDescription);
		});
	}
	onBusinessPhoneBlur(index,textField){
		console.log('onBusinessPhoneBlur',index);
		let errorText = this.state.errorText;
		this.state.businessPhone[index] = textField.target.value;
		errorText['businessPhone'] = [];
		let phoneNo = textField.target.value
		let pattern = /[0-9]{6,10}/
		if (pattern.test(phoneNo)){
			errorText['businessPhone'][index] = ''
			delete window.errorStack['businessPhone'];
			this.props.manageSave('show','businessPhone',this.state.businessPhone.join());
		}
		else{
			errorText['businessPhone'][index] = 'Please enter a valid phone number';
			window.errorStack['businessPhone'] = {
				text: errorText['businessPhone'][index],
				tab : 0
			};
		};
		this.setState({errorText: errorText});
	}
	savedCategory(value){
		console.log('saving categories',categoriesToSave);
		let categoriesToSave = [];
		for(let key in value){
			if(value[key] && value[key]!=''){
				categoriesToSave.push(value[key]);
			}
		}
		this.setState({
			selectedBusinessCategory:categoriesToSave
		},function(){
	    	this.props.manageSave('show','category',categoriesToSave.join());
		});
	}
	render(){
		return (
		    <div style={this.props.styles.slide}>
	            <TextField fullWidth={true}
	            	floatingLabelText={"Short Description (max 50 chars)"}
	                defaultValue={this.state.businessShortDescription} 
	                onBlur={this.onBusinessShortDescBlur.bind(this)}
	                onChange={this.onBusinessShortDescUpdate.bind(this)}
	                errorText={this.state.errorText['businessShortDescription']}
	                maxLength={50}/>
	            <TextField fullWidth={true}
	                floatingLabelText="Business Long Description"
	                multiLine={true} 
	                defaultValue={this.state.businessLongDescription} 
	                onBlur={this.onBusinessLongDescBlur.bind(this)}
	                onChange={this.onBusinessLongDescUpdate.bind(this)}
	                errorText={this.state.errorText['businessLongDescription']}
	                maxLength={300}/> 
			    <SelectField value={this.state.languageType}
			    	anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          			targetOrigin={{horizontal: 'left', vertical: 'top'}}	
	            	floatingLabelText="Language Translation Preference"
	            	onChange={this.languageTypeChange.bind(this)}>
	            	<MenuItem value={"None"} primaryText="None"/>
	            	<MenuItem value={"bn"} primaryText="Bengali"/>
	            	<MenuItem value={"gu"} primaryText="Gujarati"/>
	            	<MenuItem value={"hi"} primaryText="Hindi"/>
	            	<MenuItem value={"kn"} primaryText="Kannada"/>
	            	<MenuItem value={"ta"} primaryText="Tamil"/>
	            	<MenuItem value={"te"} primaryText="Telugu"/>
	            	<MenuItem value={"ur"} primaryText="Urdu"/>
	            	<MenuItem value={"ml"} primaryText="Malayalam"/>
			    </SelectField>
			    <Category 
			    	selectedCategory={this.state.selectedBusinessCategory} 
			    	savedCategory={this.savedCategory.bind(this)}
			    	manageSave={this.props.manageSave} />
				{  
            		this.state.phoneClass.map((className, index) => {
            			let phoneText = "Business Phone "+(index+1);
            			let phoneNum = '';
            			if(this.state.businessPhone[index]){
            				phoneNum = this.state.businessPhone[index];
            			}
            			return (<TextField fullWidth={true}
            			    type="number"
	                		floatingLabelText={phoneText}
	                		onBlur={this.onBusinessPhoneBlur.bind(this,index)}
	                		onChange={this.onBusinessPhoneChange.bind(this,index)}
	                		errorText={this.state.errorText['businessPhone'][index]}
	                		defaultValue={phoneNum}
	                		className={className} 
	                		maxLimit={10}
	                		key={index}/>)	 
            		})
            	}            
	        </div>);
	}
}

export default Description;