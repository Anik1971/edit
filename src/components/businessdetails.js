import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TextField from 'material-ui/lib/text-field';
import SwipeableViews from 'react-swipeable-views';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import {AutoComplete} from 'material-ui/lib'

const categories = ["Accountant", "Acupuncture", "Addiction Rehabilitation Centre", "Adventure Sports", "Advertising Agency", "Lawyer", "Aerobics", "After-School Programme", "Airbrushing", "Airline Booking", "Airport Hotel", "Airport Shuttle", "Air Compressor Repair", "Air Conditioning", "Air Duct Cleaning", "Air Filters", "Air Hostess Training Institute", "Allergist", "Ambulance", "Amusement Park", "Animal Hospital", "Animation Institute", "Home Appliances", "Aquarium", "Architect", "Arena", "Army School", "Artificial Jewelry", "Artist", "Art Gallery", "Art School", "Art supplies", "Ashram", "Sports Club", "Auditor", "Auditorium", "Auto Accessories", "Car Body Parts", "Car Dealer", "Auto Electricals", "Windscreen Repairs", "Car Insurance", "Car Service", "Car Upholstery", "Ayurvedic Doctor", "Ayurvedic Hospital", "Baby Clothing", "Baby Store", "Badminton Court", "Bags", "Bakery", "Cakes", "Ballet School", "Bangles", "Banner", "Banquet Hall", "Barber", "Bar & Grill", "Baskets", "Bathroom Renovator", "Beach Resort", "Beauty Products", "Beauty Parlour", "Bed & Breakfast", "Beverage", "Bicycle Rental", "Bicycles", "Bird Store", "Bistro", "Blood Bank", "Boarding School", "Boating Club", "Boat Tour", "Body Piercing", "Books", "Bottled Water", "Boutique", "Bowling Alley", "Tiffins", "Hostel", "Brewery", "Bridal Store", "Building Materials", "Bus Rentals", "Van Rentals", "Bus Ticket", "Tours and Travels", "Cable TV", "Electrical Wires & Cables", "Cakes", "Camera Repair", "Camera", "Candles", "Sweets", "Cardiologist", "Career Consultant", "Carpenter", "Carpet Cleaner", "Carpets", "Auto Accessories", "Car Dealer", "Car Rental", "Chauffeur", "Car Wash", "Clothing", "Catering", "Caterer", "Mobile Phone", "Cement Dealer", "Jewelery", "Chartered Accountant", "Children's Books", "Children's Clothing", "Childrens Hospital", "Childcare", "China and Glassware", "Chiropractor", "Chocolates", "Circus", "Tax Consultant", "Cleaning", "Clock Repairs", "Clothing", "Coaching Center", "Cocktail Bar", "Coffee", "Cold Storage", "Collectables", "College", "Comic Books", "Community College", "Computer Hardware", "Computer Networking", "IT security", "Computers", "Computer Training Institute", "Concert Hall", "Condiments", "Real Estate", "Contact Lenses", "Convention Centre", "Convent School", "Cooking Class", "Corporate Lawyer", "Cosmetics", "Costume Rental", "Fancy Dress", "Counsellor", "Kitchenware", "Couriers", "Crafts", "Cruise", "Custom T-shirt", "Cutlery", "Dairy Products", "Day Boarding School", "Child Care Centre", "Spa", "Clinic", "Dentist", "Departmental Store", "Dermatologist", "Designer Clothing", "Dhaba", "Diabetologist", "Diagnostics", "Dialysis Centre", "Dietician", "Digital Printer", "Disco", "Distance Learning Center", "Physician", "Dolls", "Doughnut", "Drama School", "Driving School", "Chemist", "Dry Cleaning", "Dry Fruits", "Educational Loan", "Egg", "Electrical Accessories", "Electrical Repairs", "Electricals", "Electronics", "Electronics Accessories", "Electronics Repairs", "Primary School", "Lift Company", "Embroidery", "Emergency Service", "Recruitment Agency", "Endocrinologist", "Endodontist", "Engineering College", "English Classes", "Entertainment Agency", "Environmental Consultant", "Espresso Bar", "Event Management", "Eye Hospital", "Fabrication", "Fabric Store", "Facial Spa", "Family Counselling", "Family Planning", "Farm Equipment", "Fashion Designer", "Fashion Photographer", "Fashion Institute", "Fax", "Animal Feed", "Fertility Clinic", "Fertility Doctor", "Fertilizers", "Festive Gifts", "Film & Television", "Financial Institution", "Financial Advisor", "Fine Dining", "Fireworks", "Fire Proofing", "Fire Station", "First Aid", "Fishing Equipment", "Fitness Centre", "Fitness Equipment", "Flooring", "Florist", "Flour Mill", "Food and Drink", "Food Court", "Function Room Facility", "Funeral Home", "Furnished Apartment", "Furniture Maker", "Furniture Rentals", "Furniture Repairs", "Furniture", "Game Store", "Garden Products", "Gastroenterologist", "Contractor", "General Insurance", "Dairy", "Generators", "Geyser", "Gift", "Glass & Mirror", "Gold Jeweler", "Golf Club", "Golf Course", "Golf Resort", "Go Karting", "GPS Dealer", "Granites and Marbles", "Graphic Design", "Supermarket", "Guest House", "Guitar", "Fitness Centre", "Gymnastics", "Obstetrician", "Gynaecologist", "Hair Care", "Hair Dresser", "Handicrafts", "Hardware", "Hats", "Healing Therapy", "Healthy Foods", "Haematologist", "Herbal Products", "Hobby", "Holistic Medicine", "Home Insurance", "Hotel", "Hotel Management", "House Cleaning", "Home Loan", "Loans", "Hypermarket", "Ice Cream", "ICSE School", "Imax Cinema", "Immunologist", "Insurance Agency", "Interior Decoration", "International School", "Internet Cafe", "Inverter & UPS", "Printing", "Jackets", "Jewellery", "Juice Bar", "Kanchipuram Saree", "Karaoke Bar", "Karate School", "Kindergarten", "Kitchen Appliances", "Kitchen Designer", "Ladies Tailor", "Lamp Repairs", "Language Classes", "Law College", "Leather Accessories", "Leather Cleaning", "Library", "Life Insurance", "Lightings", "Lodge", "LPG Fitment Center", "Luggage Repairs", "Luggage", "Luxury Car Rentals", "Luxury Hotel", "Marbles", "Marketing Agency", "Marketing Consultancy", "Marriage Consultancy", "Martial Arts", "Massage", "Maternity Centre", "Bedding Store", "Medical Examiner", "Medical Insurance Agency", "Meditation Class", "Men's Clothing", "Men's Hostel", "Mens Tailor", "Microwave Repairs", "Mobile Phone Repairs", "Modelling Agency", "Modular Kitchen", "Montessori School", "Bike Rentals", "Bike Repairs", "Cinema", "Packers & Movers", "Musical Instruments", "Music Sckenool", "Music Store", "Nail Salon", "Namkeens", "Natural Foods", "Nephrologist", "Neurologist", "Newspaper Advertising", "Nightclub", "Nursery School", "Nursing College", "Nutritionist", "Nut", "Office Equipments", "Office Services", "Office Rentals", "Office supplies", "Oncologist", "Ophthalmologist", "Dental Surgeon", "Organic Foods", "Orthodontist", "Sports", "Painting Class", "Paints", "Garage", "Car Park", "Party Equipment Rentals", "Party Planner", "Pastry", "Paternity Testing", "Pathologist", "Pediatrician", "Stationery", "Perfumes", "Periodontist", "Pesticides", "Pest Control", "Pet Adoption", "Pet Care", "Pet Store", "Chemist", "Photographer", "Photo Lab", "Physiatrist", "Physical Therapist", "Physiotherapy Center", "Pipe Dealer", "Pizza", "Plastic Furniture", "Play School", "Plumber", "Polytechnic College", "Snooker and Pool Club", "Pottery", "Pregnancy Care", "Pre-school", "Primary School", "Printer Repairs", "Printing", "Home Stay", "Private Hospital", "Public school", "Private Tutor", "Psychiatric Clinic", "Psychiatrist", "Psychologist", "Psychotherapist", "Pub", "Public Library", "Swimming Pool", "Public Transport", "Utilities", "Publisher", "Pulmonologist", "Radiator Repairs", "Radiologist", "Radio & Television Advertising Agency", "Radio Station", "Radio Tower", "Rafting Club", "Ranching", "Real Estate Agent", "Recreation Centre", "Recruitment Agency", "Refrigerator Repairs", "Rehabilitation Centre", "Reiki Therapist", "Resort", "Cafe", "Old Age Home", "Rheumatologist", "Rock Climbing", "Roofing	Solutions", "Roofing Supplies", "Rugs", "Safe & Vault", "Salads", "Sandwiches", "Sarees", "School", "School For The Deaf", "School Uniforms", "Arts and Crafts", "Screen Printers", "SCUBA Diving", "Sculptures", "Auto Seat Cover", "Self Defence School", "Serviced Accommodation", "Service Apartment", "Wastewater Treatment", "Sewing Machine Repair", "Sexologist", "Shawls", "Shoes", "Shopping Centre", "Skin Care", "Sofas", "Solar Energy Equipment", "Souvenirs", "Spa", "Spa and Health Club", "Spa Resort & Hotel", "Speech & Hearing Specialist", "Spices", "Sporting Goods", "Sportswear", "Sports Academy", "Sports Bar", "Sports School", "Stationery", "Steak House", "Structural Engineer", "Sunglasses", "Supermarket", "Swimming Coaching Center", "Swimming Pool", "Swimming Pool Repair and Maintenance", "Swimwear", "Swimming Club", "Synagogue", "Tabla Instructor", "Table Tennis Club", "Tailor", "Tattoo-Removal", "Tattoo Studio", "Taxis", "Tax Consultant", "Tea", "Technical College", "Telephones", "Television Repairs", "Tennis Club", "Tennis Court", "Tent House", "Thai Massage Therapist", "Therapists", "Threads & Yarns", "Tiles", "Tyre Manufacturer", "Tyres", "Title Company", "Tours", "Tour Operator", "Towing Service", "Toys", "Tractor Repairs", "Training Centre", "Railway Ticket Agent", "Travel Agents", "Travel Insurance Agency", "Trichologist", "Tubewell Contractor", "Teacher", "Typewriter Repairs", "Typist", "Unani Clinic", "Hairdresser", "Upholstery Cleaners", "Upholsterer", "Urologist", "Used Store", "Vacuum Cleaners", "Vascular Surgeon", "Vastu Consultant", "Veterinarian", "Veterinary Care", "Video Arcade", "Video Equipments", "Video Games", "Vineyard", "Vocal Instructor", "Wallets", "Wallpapers", "Washing Machine & Dryer Repairs", "Washing Machine & Dryer", "Watch Repairs", "Watches", "Water Tank Cleaners", "Water Treatment", "Web Hosting Provider", "Wedding Clothing", "Wedding Photographer", "Event Manager", "Wedding Portrait Studio", "Wedding Services", "Wedding Accessories", "Weight Loss Center", "Wellness Centre", "Wheelchair Repairs", "Wheelchairs", "Wheel & Frame Alignment", "Wheels", "Window Cleaning", "Window Installation", "Window Tinting", "Curtains", "Wines", "Women's College", "Women's Hostel", "Plywood", "Yoga", "Youth Hostel", "Zoo", "Matrimony", "Web Deverlopment"];

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        minHeight: 500,
        padding: 10,
        backgroundColor: "white"
    },
    input: {
        width: 300
    },
    inkbar: {
        backgroundColor: "#76D1F2",
        height: 4
    },
    tabs: {
        backgroundColor: "#F7F3F3"
    },
    tab: {
        textTransform: "uppercase"
    }
};

const TAB_HEADERS = ['Description', 'Location', 'Delivery', 'Payments'];

class BusinessDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            categories: []
        };
    }

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme({
                palette: {
                    alternateTextColor: Colors.black
                }
            }),
        };
    }

    onCategoryRequest(category) {
        this.setState({
            categories: []
        });    
    }
    
    onCategoryUpdate(category) {
        let lowerCaseCategory = category.trim().toLowerCase(),
            searchCategories = categories.filter((item)=>{ return item.toLowerCase().startsWith(lowerCaseCategory)});
        this.setState({
            categories: searchCategories
        });
    }

    render() {
        return (
            <div>
                <Tabs
                  onChange={this.handleChange.bind(this)}
                  value={this.state.slideIndex}
                  inkBarStyle = {styles.inkbar}
                  style = {styles.tabs}
                  tabItemContainerStyle = {styles.tab}
                  className = "profile-tabs"
                >
                  {
                    TAB_HEADERS.map((header, index) => {
                        return <Tab label={header} value={index} key={index}/>;
                    })
                  }
                  
                </Tabs>
                <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange.bind(this)}
                >
                  <div style={styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="Business Description" />
                    <TextField fullWidth={true}
                        floatingLabelText="Business Long Description"
                        multiLine={true} />
                    <AutoComplete
                        floatingLabelText="Category"
                        fullWidth={true}
                        animated={false}
                        dataSource={this.state.categories}
                        onUpdateInput={this.onCategoryUpdate.bind(this)}
                        onNewRequest={this.onCategoryRequest.bind(this)}
                        className={"category"}/>
                  </div>
                  <div style={styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="City" />
                    <TextField fullWidth={true}
                        floatingLabelText="Locality" />
                    <TextField fullWidth={true}
                        floatingLabelText="Address" />
                  </div>
                  <div style={styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="Delivery Pricing" />
                    <TextField fullWidth={true}
                        floatingLabelText="Business Long Description" />
                    <TextField fullWidth={true}
                        floatingLabelText="Floating Label Text" />
                    <TextField fullWidth={true}
                        floatingLabelText="Floating Label Text" />
                    <TextField fullWidth={true}
                        floatingLabelText="Floating Label Text" />
                  </div>
                  <div style={styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="Busi" />
                    <TextField fullWidth={true}
                        floatingLabelText="Business Long Description" />
                    <TextField fullWidth={true}
                        floatingLabelText="Floating Label Text" />
                    <TextField fullWidth={true}
                        floatingLabelText="Floating Label Text" />
                    <TextField fullWidth={true}
                        floatingLabelText="Floating Label Text" />
                  </div>
                </SwipeableViews>
            </div>
        );
    }
}
BusinessDetail.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

export default BusinessDetail;