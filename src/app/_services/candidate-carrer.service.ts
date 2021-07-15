import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateCarrerService {

  constructor() { }

  getSchool(){
    return [
      "Harvard University",
      "Stanford University",
      "Massachusetts Institute of Technology (MIT)",
      "University of California Berkeley (UCB)",
      "University of California, Los Angeles (UCLA)",
      "Yale University",
      "Columbia University",
      "Princeton University",
      "New York University (NYU)",
      "University of Pennsylvania",
      "University of Chicago",
      "Cornell University",
      "Duke University",
      "Johns Hopkins University",
      "University of Southern California",
      "Northwestern University",
      "Carnegie Mellon University",
      "University of Michigan",
      "Brown University",
      "Boston University",
      "California Institute of Technology (Caltech)",
      "Emory University",
      "Rice University",
      "University of Washington, Seattle",
      "Washington University in St. Louis",
      "Georgetown University",
      "University of California, San Diego (UCSD)",
      "Vanderbilt University",
      "University of Texas at Austin",
      "University of Illinois at Urbana-Champaign",
      "University of Rochester",
      "Dartmouth College",
      "University of North Carolina, Chapel Hill",
      "University of California, Davis (UCD)",
      "University of Florida",
      "Tufts University",
      "University of Illinois, Chicago (UIC)",
      "Georgia Institute of Technology (Georgia Tech)",
      "Stony Brook University",
      "University of Virginia",
      "Case Western Reserve University",
      "Rutgers - The State University of New Jersey",
      "University of California, Santa Barbara (UCSB)",
      "Pennsylvania State University, University Park",
      "George Washington University",
      "University of California, Irvine (UCI)",
      "University of Notre Dame",
      "University of Miami",
      "Northeastern University",
      "Ohio State University, Columbus",
      "University at Buffalo SUNY"
    ];
  }

  getTechnocalMajor(){
    return [
      "Public Accounting",
      "Engineering",
      "Computer Science",
      "Physics",
      "Mathematics",
      "Statistics"
    ];
  }

  getDegree(){
    return [
      "Masters Degree",
      "PHD"
    ];
  }

  getTitle(){
    return [
      "VP",
      "Vice President",
      "Director",
      "Managing Director",
      "MD",
      "Head of"
    ];
  }

  getCompanies(){
    return ["Walmart", "Amazon", "Apple", "CVS Health", "United Health Group", "Berkshire Hathaway", "McKesson", "Amerisource Bergen", 
            "Alphabet", "Exxon Mobil", "AT&T", "Costco Wholesale", "Cigna", "Cardinal Health", "Microsoft", "Walgreens Boots Alliance", 
            "Kroger", "Home Depot", "JPMorgan Chase", "Verizon Communications", "Ford Motor", "General Motors", "Anthem", "Centene", 
            "Fannie Mae", "Comcast", "Chevron", "Dell Technologies", "Bank of America", "Target", "Lowe’s", "Marathon Petroleum", 
            "Citigroup", "Facebook", "UPS", "Johnson & Johnson", "Wells Fargo", "General Electric", "State Farm Insurance", "Intel", 
            "Humana", "IBM", "Procter Gamble", "PepsiCo", "FedEx", "MetLife", "Freddie Mac", "Phillips 66", "Lockheed-Martin", 
            "Walt Disney", "Archer Daniels Midland", "Albertsons", "Valero Energy", "Boeing", "Prudential Financial", "HP", 
            "Raytheon Technologies", "Stone X Group", "Goldman Sachs Group", "Sysco", "Morgan Stanley", "HCA Healthcare", 
            "Cisco Systems", "Charter Communications", "Merck", "Best Buy", "New York life Insurance", "AbbVie", 
            "Publix Super Markets", "Allstate", "Liberty Mutual Insurance Group", "AIG", "Tyson Foods", "Progressive", 
            "Bristol Myers Squibb", "Nationwide", "Pfizer", "Caterpillar", "TIAA", "Oracle", "Energy Transfer", "Dow", 
            "American Express", "General Dynamics", "Nike", "Northrop Grumman", "USAA", "Deere", "Abbott Laboratories", 
            "Northwestern Mutual", "Dollar General", "Exelon", "Coca-Cola", "Honeywell International", "Thermo Fisher Scientific", 
            "3M", "TJX", "Travelers", "Capital One Financial", "Tesla", "Philip Morris International", "Arrow Electronics", "CHS", 
            "Jabil", "Enterprise Products Partners", "Hewlett Packard Enterprise", "United Natural Foods", "Mondelez International", 
            "ViacomCBS", "Kraft Heinz", "Dollar Tree", "Amgen", "U.S. Bancorp", "Performance Food Group", "Netflix", 
            "Gilead Sciences", "Synnex", "Eli Lilly", "Truist Financial", "PNC Financial Services Group", "Broadcom", "CBRE Group", 
            "Massachusetts Mutual Life Insurance", "Qualcomm", "Starbucks", "Duke Energy", "Plains GP Holdings", "US Foods Holding", 
            "Lennar", "Danaher", "Aflac", "Rite Aid", "Visa", "PayPal Holdings", "Micron Technology", "CarMax", "Salesforce", 
            "Altria Group", "Lumen Technologies", "Baker Hughes", "International Paper", "Hartford Financial Services Group", 
            "Penske Automotive Group", "DuPont", "AutoNation", "Southern", "World Fuel Services", "D.R. Horton", "Nucor", 
            "Cummins", "NGL Energy Partners", "DXC Technology", "Union Pacific", "Whirlpool", "Molina Healthcare", "ConocoPhillips", 
            "McDonald's", "Kimberly-Clark", "Paccar", "PG&E", "CDW", "Sherwin-Williams", "L3Harris Technologies", "Macy's", 
            "ManpowerGroup", "NextEra Energy", "Tenet Healthcare", "Avnet", "General Mills", "WestRock", "Carrier Global", 
            "Lincoln National", "Genuine Parts", "American Airlines Group", "Marsh & McLennan", "Applied Materials", 
            "Becton Dickinson", "Delta Air Lines", "Lear", "Bank of New York Mellon", "Emerson Electric", "Western Digital", 
            "Occidental Petroleum", "Nvidia", "Cognizant Technology Solutions", "Jones Lang LaSalle", "Synchrony Financial", 
            "Colgate-Palmolive", "AECOM", "XPO Logistics", "C.H. Robinson Worldwide", "BlackRock", "Dominion Energy", 
            "Rocket Companies", "Kohl's", "Fluor", "DISH Network", "BJ's Wholesale Club", "Tenneco", "United Airlines Holdings", 
            "Mastercard", "Waste Management", "PBF Energy", "American Electric Power", "Fiserv", "Principal Financial", 
            "Reinsurance Group of America", "Automatic Data Processing", "Stanley Black & Decker", "Texas Instruments", 
            "Halliburton", "Stryker", "Estée Lauder", "Corteva", "Freeport-McMoRan", "Qurate Retail", "Wayfair", 
            "Laboratory Corp. of America", "Land O'Lakes", "PPG Industries", "Gap", "Kellogg", "Parker-Hannifin", "Core-Mark Holding", 
            "Jacobs Engineering Group", "Edison International", "Guardian Life Ins. Co. of America", "Biogen", "Omnicom Group", 
            "Unum Group", "Lithia Motors", "American Family Insurance Group", "Discover Financial Services", "Adobe", "Aramark", 
            "Otis Worldwide", "Ecolab", "AutoZone", "Loews", "Illinois Tool Works", "Fidelity National Information Services", 
            "Ross Stores", "Peter Kiewit Sons'", "Equitable Holdings", "WESCO International", "Goodyear Tire & Rubber", "Fox", 
            "Leidos Holdings", "Consolidated Edison", "DTE Energy", "Charles Schwab", "State Street", "Ameriprise Financial", 
            "Viatris", "Sempra Energy", "Farmers Insurance Exchange", "L Brands", "W.W. Grainger", "Community Health Systems", 
            "Ball", "Berry Global Group", "Kinder Morgan", "VF", "Baxter International", "Textron", "LKQ", "Keurig Dr Pepper", 
            "O'Reilly Automotive", "Crown Holdings", "Universal Health Services", "DaVita", "Xcel Energy", "Newmont", "Vistra", 
            "IQVIA Holdings", "eBay", "Corning", "Quanta Services", "HollyFrontier", "Bed Bath & Beyond", "Uber Technologies", 
            "Mutual of Omaha Insurance", "Conagra Brands", "PulteGroup", "EOG Resources", "Group 1 Automotive", "Ally Financial", 
            "Fidelity National Financial", "Nordstrom", "Discovery", "Tractor Supply", "CSX", "Marriott International", "FirstEnergy", 
            "Jones Financial (Edward Jones)", "BorgWarner", "Republic Services", "Henry Schein", "Expeditors Intl. of Washington", 
            "Entergy", "Advance Auto Parts", "Assurant", "Pacific Life", "Lam Research", "Boston Scientific", "Altice USA", 
            "Norfolk Southern", "Sonic Automotive", "Advanced Micro Devices", "United States Steel", "Markel", "ODP", "AES", 
            "Molson Coors Beverage", "J.B. Hunt Transport Services", "KKR", "Hormel Foods", "Public Service Enterprise Group", 
            "Steel Dynamics", "Dick's Sporting Goods", "Mohawk Industries", "Murphy USA", "Square", "Quest Diagnostics", 
            "Newell Brands", "Liberty Media", "Huntington Ingalls Industries", "Cheniere Energy", "SpartanNash", "Alcoa", "AGCO", 
            "Voya Financial", "NRG Energy", "Interpublic Group", "Campbell Soup", "Southwest Airlines", "News Corp.", 
            "Eversource Energy", "Alleghany", "Air Products & Chemicals", "Auto-Owners Insurance", "CenterPoint Energy", 
            "Reliance Steel & Aluminum", "EMCOR Group", "Owens & Minor", "Mosaic", "Erie Insurance Group", "Genworth Financial", 
            "Amphenol", "Builders FirstSource", "Oneok", "United Rentals", "Brighthouse Financial", "Regeneron Pharmaceuticals", 
            "Eastman Chemical", "CommScope Holding", "Ryder System", "Fifth Third Bancorp", "Constellation Brands", 
            "Insight Enterprises", "Global Partners", "Univar Solutions", "Yum China Holdings", "Targa Resources", 
            "Intercontinental Exchange", "Andersons", "Raymond James Financial", "Thor Industries", 
            "Thrivent Financial for Lutherans", "Hershey", "Casey's General Stores", "W.R. Berkley", "Activision Blizzard", 
            "Western & Southern Financial Group", "American Tower", "American Financial Group", "Darden Restaurants", "J.M. Smucker", 
            "Williams", "Intuit", "Citizens Financial Group", "PPL", "NVR", "Westinghouse Air Brake Technologies", "Foot Locker", 
            "Cincinnati Financial", "Weyerhaeuser", "Westlake Chemical", "Navistar International", "Magellan Health", 
            "Booz Allen Hamilton Holding", "Autoliv", "S&P Global", "Global Payments", "Motorola Solutions", "KeyCorp", 
            "Delek US Holdings", "Masco", "Graybar Electric", "WEC Energy Group", "Old Republic International", 
            "Frontier Communications", "Chewy", "PVH", "Asbury Automotive Group", "Seaboard", "Polaris", "Dana", 
            "First American Financial", "Cintas", "Toll Brothers", "Science Applications International", "Owens Corning", 
            "Zimmer Biomet Holdings", "Xerox Holdings", "Arthur J. Gallagher", "Avery Dennison", "Sanmina", 
            "Jefferies Financial Group", "Beacon Roofing Supply", "Securian Financial Group", "Oshkosh", "FM Global", 
            "Booking Holdings", "Williams-Sonoma", "Coty", "Clorox", "Pioneer Natural Resources", "Dover", "CMS Energy", "Zoetis", 
            "Hanesbrands", "Packaging Corp. of America", "Regions Financial", "Graphic Packaging Holding", "UGI", 
            "Sprouts Farmers Market", "Avantor", "Veritiv", "Rockwell Automation", "MasTec", "DCP Midstream", "Northern Trust", 
            "M&T Bank", "Realogy Holdings", "NCR", "T. Rowe Price", "Vertex Pharmaceuticals", "Big Lots", "Ralph Lauren", 
            "Ulta Beauty", "Taylor Morrison Home", "Icahn Enterprises", "Blackstone Group", "O-I Glass", 
            "Fortune Brands Home & Security", "NOV", "Ovintiv", "Alexion Pharmaceuticals", "Huntsman", "Equinix", "ABM Industries", 
            "Ingredion", "Chipotle Mexican Grill", "Sinclair Broadcast Group", "LPL Financial Holdings", "Crown Castle International", 
            "KLA", "Ameren", "KBR", "Burlington Stores", "Olin", "CACI International", "Post Holdings", "Academy Sports and Outdoors", 
            "Arconic", "Celanese", "Yum Brands", "Fastenal", "Nasdaq", "Analog Devices", "McCormick", "Carvana", "Franklin Resources", 
            "Electronic Arts", "MDU Resources Group", "Select Medical Holdings", "Roper Technologies", "RPM International", "Cerner", 
            "Patterson", "Commercial Metals", "Boise Cascade", "Hasbro", "A-Mark Precious Metals", "Camping World Holdings", "NetApp", 
            "Avis Budget Group", "R.R. Donnelley & Sons", "Moody's"];
  }
}
