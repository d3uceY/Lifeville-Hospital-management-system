//registration form data
import * as allTheForms from "../registrationForm"
import { RegistrationFormList } from "../registrationForm";

const [
  RegistrationForm,
  ContactInformationForm,
  DemographicForm,
  NextOfKinForm,
  MedicalHistoryForm,
  Allergies,
] = RegistrationFormList;

export const formTabData = [
  {
    component: RegistrationForm,
    title: "Basic Information",
    cardDescription:
      "Enter basic registration details such as date, hospital number, and full name.",
  },
  {
    component: [ContactInformationForm, DemographicForm],
    title: "Contact & Demographic Details",
    cardDescription:
      "Provide gender, marital status, date of birth, phone number, address, occupation, and workplace address.",
  },
  {
    component: NextOfKinForm,
    title: "Next of Kin / Emergency Contact",
    cardDescription:
      "Enter details for your emergency contact including name, relationship, address, and phone number.",
  },
  {
    component: MedicalHistoryForm,
    title: "Medical History",
    cardDescription:
      "Record your past medical, surgical, family, social, and drug history.",
  },
  {
    component: Allergies,
    title: "Allergies & Dietary Restrictions",
    cardDescription:
      "Specify any allergies and dietary restrictions, including details on drug or food allergies.",
  },
];

//table header data
export const tabList = [
  { value: "basic-info", name: "Basic Information" },
  {   value: "contact", name: "Contact & Demographic Details" },
  { value: "kin", name: "Next of Kin / Emergency Contact" },
  { value:  "medical", name: "Medical History" },
  { value: "allergies", name: "Allergies & Dietary Restrictions" },
];


export const nationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguans", "Argentine", 
  "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", 
  "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", 
  "Bosnian", "Botswanan", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", 
  "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", 
  "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", 
  "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", 
  "East Timorese", "Ecuadorean", "Egyptian", "Emirati", "Equatorial Guinean", "Eritrean", 
  "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", 
  "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinean", "Guyanese", 
  "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", 
  "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", 
  "Kenyan", "Kiribati", "Kuwaiti", "Kyrgyz", "Lao", "Latvian", "Lebanese", "Liberian", 
  "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", 
  "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", 
  "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Montenegrin", 
  "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", 
  "Nicaraguan", "Nigerien", "Nigerian", "North Korean", "Norwegian", "Omani", "Pakistani", 
  "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", 
  "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", 
  "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Senegalese", "Serbian", "Seychellois", 
  "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", 
  "South African", "South Korean", "South Sudanese", "Spanish", "Sri Lankan", "Sudanese", 
  "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Tajik", "Tanzanian", "Thai", "Togolese", 
  "Tongan", "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian", 
  "Uruguayan", "Uzbek", "Vanuatuan", "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
];
