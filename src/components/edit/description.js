import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {AutoComplete} from 'material-ui/lib';
import Checkbox from 'material-ui/lib/checkbox';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
const categoryLimit = 5;
const categories = ["Accountant", "Acupuncture", "Addiction Rehabilitation Centre", "Adventure Sports", "Advertising Agency", "Lawyer", "Aerobics", "After-School Programme", "Airbrushing", "Airline Booking", "Airport Hotel", "Airport Shuttle", "Air Compressor Repair", "Air Conditioning", "Air Duct Cleaning", "Air Filters", "Air Hostess Training Institute", "Allergist", "Ambulance", "Amusement Park", "Animal Hospital", "Animation Institute", "Home Appliances", "Aquarium", "Architect", "Arena", "Army School", "Artificial Jewelry", "Artist", "Art Gallery", "Art School", "Art supplies", "Ashram", "Sports Club", "Auditor", "Auditorium", "Auto Accessories", "Car Body Parts", "Car Dealer", "Auto Electricals", "Windscreen Repairs", "Car Insurance", "Car Service", "Car Upholstery", "Ayurvedic Doctor", "Ayurvedic Hospital", "Baby Clothing", "Baby Store", "Badminton Court", "Bags", "Bakery", "Cakes", "Ballet School", "Bangles", "Banner", "Banquet Hall", "Barber", "Bar & Grill", "Baskets", "Bathroom Renovator", "Beach Resort", "Beauty Products", "Beauty Parlour", "Bed & Breakfast", "Beverage", "Bicycle Rental", "Bicycles", "Bird Store", "Bistro", "Blood Bank", "Boarding School", "Boating Club", "Boat Tour", "Body Piercing", "Books", "Bottled Water", "Boutique", "Bowling Alley", "Tiffins", "Hostel", "Brewery", "Bridal Store", "Building Materials", "Bus Rentals", "Van Rentals", "Bus Ticket", "Tours and Travels", "Cable TV", "Electrical Wires & Cables", "Cakes", "Camera Repair", "Camera", "Candles", "Sweets", "Cardiologist", "Career Consultant", "Carpenter", "Carpet Cleaner", "Carpets", "Auto Accessories", "Car Dealer", "Car Rental", "Chauffeur", "Car Wash", "Clothing", "Catering", "Caterer", "Mobile Phone", "Cement Dealer", "Jewelery", "Chartered Accountant", "Children's Books", "Children's Clothing", "Childrens Hospital", "Childcare", "China and Glassware", "Chiropractor", "Chocolates", "Circus", "Tax Consultant", "Cleaning", "Clock Repairs", "Clothing", "Coaching Center", "Cocktail Bar", "Coffee", "Cold Storage", "Collectables", "College", "Comic Books", "Community College", "Computer Hardware", "Computer Networking", "IT security", "Computers", "Computer Training Institute", "Concert Hall", "Condiments", "Real Estate", "Contact Lenses", "Convention Centre", "Convent School", "Cooking Class", "Corporate Lawyer", "Cosmetics", "Costume Rental", "Fancy Dress", "Counsellor", "Kitchenware", "Couriers", "Crafts", "Cruise", "Custom T-shirt", "Cutlery", "Dairy Products", "Day Boarding School", "Child Care Centre", "Spa", "Clinic", "Dentist", "Departmental Store", "Dermatologist", "Designer Clothing", "Dhaba", "Diabetologist", "Diagnostics", "Dialysis Centre", "Dietician", "Digital Printer", "Disco", "Distance Learning Center", "Physician", "Dolls", "Doughnut", "Drama School", "Driving School", "Chemist", "Dry Cleaning", "Dry Fruits", "Educational Loan", "Egg", "Electrical Accessories", "Electrical Repairs", "Electricals", "Electronics", "Electronics Accessories", "Electronics Repairs", "Primary School", "Lift Company", "Embroidery", "Emergency Service", "Recruitment Agency", "Endocrinologist", "Endodontist", "Engineering College", "English Classes", "Entertainment Agency", "Environmental Consultant", "Espresso Bar", "Event Management", "Eye Hospital", "Fabrication", "Fabric Store", "Facial Spa", "Family Counselling", "Family Planning", "Farm Equipment", "Fashion Designer", "Fashion Photographer", "Fashion Institute", "Fax", "Animal Feed", "Fertility Clinic", "Fertility Doctor", "Fertilizers", "Festive Gifts", "Film & Television", "Financial Institution", "Financial Advisor", "Fine Dining", "Fireworks", "Fire Proofing", "Fire Station", "First Aid", "Fishing Equipment", "Fitness Centre", "Fitness Equipment", "Flooring", "Florist", "Flour Mill", "Food and Drink", "Food Court", "Function Room Facility", "Funeral Home", "Furnished Apartment", "Furniture Maker", "Furniture Rentals", "Furniture Repairs", "Furniture", "Game Store", "Garden Products", "Gastroenterologist", "Contractor", "General Insurance", "Dairy", "Generators", "Geyser", "Gift", "Glass & Mirror", "Gold Jeweler", "Golf Club", "Golf Course", "Golf Resort", "Go Karting", "GPS Dealer", "Granites and Marbles", "Graphic Design", "Supermarket", "Guest House", "Guitar", "Fitness Centre", "Gymnastics", "Obstetrician", "Gynaecologist", "Hair Care", "Hair Dresser", "Handicrafts", "Hardware", "Hats", "Healing Therapy", "Healthy Foods", "Haematologist", "Herbal Products", "Hobby", "Holistic Medicine", "Home Insurance", "Hotel", "Hotel Management", "House Cleaning", "Home Loan", "Loans", "Hypermarket", "Ice Cream", "ICSE School", "Imax Cinema", "Immunologist", "Insurance Agency", "Interior Decoration", "International School", "Internet Cafe", "Inverter & UPS", "Printing", "Jackets", "Jewellery", "Juice Bar", "Kanchipuram Saree", "Karaoke Bar", "Karate School", "Kindergarten", "Kitchen Appliances", "Kitchen Designer", "Ladies Tailor", "Lamp Repairs", "Language Classes", "Law College", "Leather Accessories", "Leather Cleaning", "Library", "Life Insurance", "Lightings", "Lodge", "LPG Fitment Center", "Luggage Repairs", "Luggage", "Luxury Car Rentals", "Luxury Hotel", "Marbles", "Marketing Agency", "Marketing Consultancy", "Marriage Consultancy", "Martial Arts", "Massage", "Maternity Centre", "Bedding Store", "Medical Examiner", "Medical Insurance Agency", "Meditation Class", "Men's Clothing", "Men's Hostel", "Mens Tailor", "Microwave Repairs", "Mobile Phone Repairs", "Modelling Agency", "Modular Kitchen", "Montessori School", "Bike Rentals", "Bike Repairs", "Cinema", "Packers & Movers", "Musical Instruments", "Music Sckenool", "Music Store", "Nail Salon", "Namkeens", "Natural Foods", "Nephrologist", "Neurologist", "Newspaper Advertising", "Nightclub", "Nursery School", "Nursing College", "Nutritionist", "Nut", "Office Equipments", "Office Services", "Office Rentals", "Office supplies", "Oncologist", "Ophthalmologist", "Dental Surgeon", "Organic Foods", "Orthodontist", "Sports", "Painting Class", "Paints", "Garage", "Car Park", "Party Equipment Rentals", "Party Planner", "Pastry", "Paternity Testing", "Pathologist", "Pediatrician", "Stationery", "Perfumes", "Periodontist", "Pesticides", "Pest Control", "Pet Adoption", "Pet Care", "Pet Store", "Chemist", "Photographer", "Photo Lab", "Physiatrist", "Physical Therapist", "Physiotherapy Center", "Pipe Dealer", "Pizza", "Plastic Furniture", "Play School", "Plumber", "Polytechnic College", "Snooker and Pool Club", "Pottery", "Pregnancy Care", "Pre-school", "Primary School", "Printer Repairs", "Printing", "Home Stay", "Private Hospital", "Public school", "Private Tutor", "Psychiatric Clinic", "Psychiatrist", "Psychologist", "Psychotherapist", "Pub", "Public Library", "Swimming Pool", "Public Transport", "Utilities", "Publisher", "Pulmonologist", "Radiator Repairs", "Radiologist", "Radio & Television Advertising Agency", "Radio Station", "Radio Tower", "Rafting Club", "Ranching", "Real Estate Agent", "Recreation Centre", "Recruitment Agency", "Refrigerator Repairs", "Rehabilitation Centre", "Reiki Therapist", "Resort", "Cafe", "Old Age Home", "Rheumatologist", "Rock Climbing", "Roofing  Solutions", "Roofing Supplies", "Rugs", "Safe & Vault", "Salads", "Sandwiches", "Sarees", "School", "School For The Deaf", "School Uniforms", "Arts and Crafts", "Screen Printers", "SCUBA Diving", "Sculptures", "Auto Seat Cover", "Self Defence School", "Serviced Accommodation", "Service Apartment", "Wastewater Treatment", "Sewing Machine Repair", "Sexologist", "Shawls", "Shoes", "Shopping Centre", "Skin Care", "Sofas", "Solar Energy Equipment", "Souvenirs", "Spa", "Spa and Health Club", "Spa Resort & Hotel", "Speech & Hearing Specialist", "Spices", "Sporting Goods", "Sportswear", "Sports Academy", "Sports Bar", "Sports School", "Stationery", "Steak House", "Structural Engineer", "Sunglasses", "Supermarket", "Swimming Coaching Center", "Swimming Pool", "Swimming Pool Repair and Maintenance", "Swimwear", "Swimming Club", "Synagogue", "Tabla Instructor", "Table Tennis Club", "Tailor", "Tattoo-Removal", "Tattoo Studio", "Taxis", "Tax Consultant", "Tea", "Technical College", "Telephones", "Television Repairs", "Tennis Club", "Tennis Court", "Tent House", "Thai Massage Therapist", "Therapists", "Threads & Yarns", "Tiles", "Tyre Manufacturer", "Tyres", "Title Company", "Tours", "Tour Operator", "Towing Service", "Toys", "Tractor Repairs", "Training Centre", "Railway Ticket Agent", "Travel Agents", "Travel Insurance Agency", "Trichologist", "Tubewell Contractor", "Teacher", "Typewriter Repairs", "Typist", "Unani Clinic", "Hairdresser", "Upholstery Cleaners", "Upholsterer", "Urologist", "Used Store", "Vacuum Cleaners", "Vascular Surgeon", "Vastu Consultant", "Veterinarian", "Veterinary Care", "Video Arcade", "Video Equipments", "Video Games", "Vineyard", "Vocal Instructor", "Wallets", "Wallpapers", "Washing Machine & Dryer Repairs", "Washing Machine & Dryer", "Watch Repairs", "Watches", "Water Tank Cleaners", "Water Treatment", "Web Hosting Provider", "Wedding Clothing", "Wedding Photographer", "Event Manager", "Wedding Portrait Studio", "Wedding Services", "Wedding Accessories", "Weight Loss Center", "Wellness Centre", "Wheelchair Repairs", "Wheelchairs", "Wheel & Frame Alignment", "Wheels", "Window Cleaning", "Window Installation", "Window Tinting", "Curtains", "Wines", "Women's College", "Women's Hostel", "Plywood", "Yoga", "Youth Hostel", "Zoo", "Matrimony", "Web Deverlopment","Pharmacy", "Restaurant", "Meat", "Laundry", "Fruits and Vegetables", "Grocery"];
const specialCategories = ["Pharmacy", "Restaurant", "Meat", "Laundry", "Fruits and Vegetables", "Grocery"];
const specialCategoriesCheckList = {
    "Pharmacy" : ["Prescription Medication","Non-Prescritiptioen (Over the counter)","Diabetics","Baby and Mother","Wellness","Personal Care","Household","24 hours","Ayurvedic","Alopathic","Homeopathic","Unani","Holistic Medicine"],
    "Meat" : ["Chicken","Lamb","Sea Food","Cold Cuts","Marinates","Turkey","Pork","Others"],
    "Laundry" : ["24 hour service","Dry Cleaning","Wash and Iron","Pickup"],
    "Fruits and Vegetables" : ["Seasonal","Cut Fruits and Vegetables","Organic","Farm Fresh","Exotic","Leafy"],
    "Grocery" : ["Baby Food and Care", "Bakery, Dessert and Confectionary", "Beverages", "Body Care", "Breakfast Cereals", "Grocery and Staples", "Health Care", "Household Needs", "Personal Care", "Personal Hygiene", "Snacks & Ready to Eat", "Miscellaneous"]
};
class GenerateCheckBox extends React.Component {
	constructor(props)
	{
		super(props);
		this.state={
			boolList:[],
			valueList: []
		}
	}
	onCheck(index,check){
		console.log('check',check.target.checked);
		if(check.target.checked){		
			this.state.boolList[index] = true;
			this.state.valueList[index] = check.target.value;
		}else{
			this.state.boolList[index] = false;		
		}
		let uploadData = [];
		for(let i in this.state.valueList){
			if(this.state.boolList[i] && this.state.valueList[i]){
				uploadData.push(this.state.valueList[i]);
			}
		}
		this.props.manageSave('show','specialcategory',uploadData.join());
		console.log('check state',this.state);
	}
  	render() {
	  	if(this.props.specialCategoriesCheckList){
	  		return (        	
            	<div className="specialCategoryCheckList">
                {
                  this.props.specialCategoriesCheckList.map((title, index) => {
                    return (
                    	<Checkbox 
                    		name={title} 
                    		value={title} 
                    		key={index} 
                    		label={title}
                    		className="checkBox"
                    		onCheck={this.onCheck.bind(this,index)} 
                    		defaultChecked={this.state.boolList[index]} />
                    );
                  })
                }
                </div>              
		    );
	  	}else{
	  		return ( 
	  			<div></div>
	  		);
	  	}	    
	  }
}

class CategoryAutoComplete extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			dynamicVals:
				[],
		    allCategories: categories,
		    categoryCount:[]		   	
        }
        console.log(this.props);
        let selectedCategory = this.props.selectedBusinessCategory.split(',');
		for(let i in selectedCategory){
			if(selectedCategory[i]){
	    		this.state.dynamicVals.push(
	        		{
						categories: [],
			            specialCategoriesCheckList: [],
			            selectedCategory: selectedCategory[i]
			        }
	        	);
	        	this.state.categoryCount.push('category'+(this.state.categoryCount.length+1));
	        }
    	}

    	if(this.state.categoryCount.length<categoryLimit){
    		this.state.dynamicVals.push(
	        		{
						categories: [],
			            specialCategoriesCheckList: [],
			            selectedCategory: ''
			        }
	        	);
    		this.state.categoryCount.push('category'+(this.state.categoryCount.length+1));
    	}
        if(typeof this.props.selectedBusinessCategory == 'object' && this.props.selectedBusinessCategory){
        	for(let i in this.props.selectedBusinessCategory){
        		this.state.dynamicVals.push(
	        		{
						categories: [],
			            specialCategoriesCheckList: []
			        }
	        	);
	        	categoryCount.push('category'+(this.state.categoryCount.length+1));
        	}
        	
        }
	}
	onCategoryRequest(index, category) {

		let state = this.state;	

		//Saving selected category, can be user in onBlur to retain previous value
		state.dynamicVals[index].selectedCategory = category;

		//Searching for special category
        let lowerCaseCategory = category.trim().toLowerCase(),
            searchSpecialCategories = this.props.specialCategories.filter((item)=>{ return item.toLowerCase().startsWith(lowerCaseCategory)});
        
        //Removing selected category from state
        let arrIndex = state.allCategories.indexOf(category);        
        if(arrIndex>-1){
        	state.allCategories.splice(arrIndex,1); 
        }	

        //saving specialCategory	
        if(searchSpecialCategories.length > 0){            
			state.dynamicVals[index].specialCategoriesCheckList = this.props.specialCategoriesCheckList[searchSpecialCategories];
			this.setState(state);
        }else{        	
			state.dynamicVals[index].specialCategoriesCheckList = [];
			this.setState(state);
        }

        //adding new autoselect field
        if(this.state.dynamicVals.length<categoryLimit){
        	this.state.dynamicVals.push(
        		{
					categories: [],
		            specialCategoriesCheckList: []
		        }
        	);
        	this.state.categoryCount.push('category'+(this.state.categoryCount.length+1));
        }
        //this.props.onCategoryUpdate(this.state.dynamicVals);
        let categoriesToSave = [];
        for(let key in this.state.dynamicVals){
        	let cat = this.state.dynamicVals[key];
        	if(cat.selectedCategory){
	        	categoriesToSave.push(cat.selectedCategory);
        	}
        }
        this.props.manageSave('show','category',categoriesToSave.join());
    }
    
    onCategoryUpdate(index, category) {
        let lowerCaseCategory = category.trim().toLowerCase(),
            searchCategories = this.props.categories.filter((item)=>{ 
            		return item.toLowerCase().startsWith(lowerCaseCategory);
            	});
        let state = this.state;
		state.dynamicVals[index].categories = searchCategories;
		this.setState(state);		
    }

    onFilter(index,category) {
     	console.log('Filter is called: ',category);
     	return;
    }

    onBlur(index,category){
    	console.log('Blur called');
    }
    onCategoryUpdateInput(index,category){
    	//console.log('onCategoryUpdateInput',category);
    }
	render() {
		if(this.state.categoryCount){
			return ( 
				<div>{  
		  			this.state.categoryCount.map((count, index) => {
		  				let categoryName = "Category";
		  				if(index>0)
		  					categoryName = "Additional Category "+(index);
		  				return (        	
			  				<div key={index}>
				            	<AutoComplete
				                    floatingLabelText={categoryName}
				                    fullWidth={true}
				                    animated={false}
				                    dataSource={this.state.allCategories}
				                    className={"category"}
				                    searchText={this.state.dynamicVals[index].selectedCategory}
				                    onFocusLost={this.onBlur.bind(this,index)}
				                    onNewRequest={this.onCategoryRequest.bind(this, index)} 
				                    onUpdateInput={this.onCategoryUpdateInput.bind(this, index)}/>
				                <GenerateCheckBox 
				                	specialCategoriesCheckList={this.state.dynamicVals[index].specialCategoriesCheckList}
				                	manageSave={this.props.manageSave} />
				            </div> 
				        );
		  			})  
	  			}</div>  	             
		    );	 
		}else{
			return ( 
	  			<div></div>
	  		);
		}
  		 	    
	}
}
class Description extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            businessType: "Self-Owned",
            businessShortDescription: this.props.bData.businessType || '',
            businessLongDescription: this.props.bData.businessDescription || '',
            selectedBusinessCategory: this.props.bData.category,
            phoneLimit:5,
            phoneClass:[],
            businessPhone:[],
            languageType:this.props.bData.languageType
        };	
        this.state.phoneClass[0] = '';
        for(let i=1;i<this.state.phoneLimit;i++){
        	this.state.phoneClass.push('hidden');
        }
	}	
	businessTypeChange(e, index, businessType){
		this.setState({
			businessType:businessType
		},function(){
			this.props.manageSave('show','ownershipType',this.state.businessType);
		});
	}
	languageTypeChange(e, index, languageType){
		this.setState({
			languageType:languageType
		},function(){
			this.props.manageSave('show','languageType',this.state.languageType);
		});
	}
	onBusinessShortDescUpdate(textField){
		this.setState({
			businessShortDescription:textField.target.value
		},function(){
			this.props.manageSave('show','businessType',this.state.businessShortDescription);
		});
	}
	onBusinessLongDescUpdate(textField){
		this.setState({
			businessLongDescription:textField.target.value
		},function(){
			this.props.manageSave('show','businessDescription',this.state.businessLongDescription);
		});
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
		this.props.manageSave('show','businessPhone',this.state.businessPhone.join());
		if(textField.target.value.length>0 && this.state.phoneLimit >= index){
			this.state.phoneClass[index+1] = '';	
		}else if(index>0 && textField.target.value.length == 0){
			this.state.phoneClass[index] = 'hidden';	
		}
	}
	render(){
		return (
		    <div style={this.props.styles.slide}>
	            <TextField fullWidth={true}
	            	floatingLabelText={"One Line Description"}
	                value={this.state.businessShortDescription} 
	                onChange={this.onBusinessShortDescUpdate.bind(this)}
	                maxLimit={50}/>
	            <TextField fullWidth={true}
	                floatingLabelText="Business Long Description"
	                multiLine={true} 
	                value={this.state.businessLongDescription} 
	                onChange={this.onBusinessLongDescUpdate.bind(this)}/> 
	            <SelectField value={this.state.businessType}
	            	floatingLabelText="Business Type"
	            	onChange={this.businessTypeChange.bind(this)}>
			        <MenuItem value={"Self-Owned"} primaryText="Self-Owned"/>
			        <MenuItem value={"Partnership"} primaryText="Partnership"/>
			        <MenuItem value={"Others"} primaryText="Others"/>
			    </SelectField>
			    <SelectField value={this.state.languageType}
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
	          	<CategoryAutoComplete 
	          		bData={this.props.bData}
	          		categories={categories}
	          		selectedBusinessCategory={this.state.selectedBusinessCategory}
	          		specialCategories={specialCategories}
	            	specialCategoriesCheckList={specialCategoriesCheckList}	            	
	            	onCategoryUpdate={this.onCategoryUpdate.bind(this)}
	            	manageSave={this.props.manageSave} />	            
				{  
            		this.state.phoneClass.map((className, index) => {
            			let phoneText = "Business Phone "+(index+1);
            			return (<TextField fullWidth={true}
	                		floatingLabelText={phoneText}
	                		onChange={this.onBusinessPhoneChange.bind(this,index)}
	                		className={className} 
	                		maxLimit={10}
	                		key={index}/>)	 
            		})
            	}            
	        </div>);
	}
}

export default Description;