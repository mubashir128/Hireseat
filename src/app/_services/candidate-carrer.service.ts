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

  getLoopSkills(){
    return {
      "java" : 8,
      "sql" : 8,
      "vba product control" : 5,
      "excel" : 5,
      "python" : 5,
      // "r" : 5,
      "supply chain management" : 5,
      "sales" : 5,
      "microsoft" : 5,
      "logistics" : 5,
      "project management" : 5,
      "pmp" : 5,
      "yms" : 5,
      "lean" : 5,
      "sourcing" : 5,
      "procurement" : 5,
      "tableau" : 5,
      "power bi" : 5,
      "data manipulation" : 5,
      "data querying" : 5,
      "data visualization" : 5,
      "rtfwe" : 5,
      "troubleshooting" : 5,
      
      "c++" : 7,
      "spanish" : 5,
      "information technology" : 5,
      "employee engagement" : 5,
      "social media" : 5,
      "data analysis" : 7,
      "storytelling" : 5,
      "leadership" : 5,
      "critical thiniking" : 5,
      "collboration" : 5,
      "administrative assistant" : 5,
      "receptionist" : 5,
      "retail" : 5,
      "data entry" : 5,
      "snowflake" : 5,
      "nodejs" : 5,
      "qa" : 5,
      "manual testing" : 5,
      "agile" : 5,
      "angularjs" : 5,
      "angular" : 5,
      "advance java" : 5,
      "client service management" : 5,
      "html" : 5,
      
      "html5" : 5,
      "cuda" : 5,
      "opwncv" : 5,
      "scipy" : 5,
      "pandas" : 7,
      "numpy" : 5,
      "aws" : 5,
      "dynamodb" : 5,
      "lamda" : 5,
      "rds" : 5,
      "s3" : 5,
      "ec2" : 5,
      "redshit" : 5,
      "esc" : 5,
      "pyspark" : 5,
      "kafka" : 5,
      "matplotib" : 9,
      "unix" : 9,
      "git" : 9,
      "pycharm" : 9,
      "jupyter" : 9,
      "spyder" : 5,
      "postgres" : 9,
      "gglplot" : 5,
      "react" : 5,
      
      "css" : 9,
      "javascript" : 9,
      "spotfire" : 5,
      "vba" : 5,
      "siz sigma" : 5,
      "pytorch" : 9,
      // "w" : 5,
      "peri" : 5,
      "shell" : 5,
      "problem solver" : 5,
      "salesforce" : 7,
      "qluckview" : 5,
      "hadoop" : 9,
      "alteryx" : 5,
      "research" : 5,
      "budgeting" : 5,
      "client relations" : 7
    };
  }

  getLoopIndustries(){
    return {
      "fixed income treasuries" : 8,
      "corporate bonds" : 5,
      "derivatives" : 10,
      "interest rate swaps" : 5,
      "credit default swaps" : 5,
      "swaptions" : 8,
      "mortgage back securities" : 7,
      "tbs's" : 5,
      "volcker" : 5,
      "dodd-frank" : 5,
      "mifid" : 5,
      "best ex" : 5,
      "basel" : 5,
      "emir" : 5,
      "financial regulations" : 5,
      "trade life cycle" : 5,
      "market risk" : 7,
      "pnl" : 5,
      "pricing" : 5,
      "series 7" : 5,
      "series 63" : 5,
      "etf trading" : 5,
      "customer service" : 5,
      "strong communication" : 5,
      "tax enquiries" : 7,
      "tax preparations" : 8,
      "ppp" : 5,
      "sba loan" : 5,
      "fmla" : 5,
      "ploa" : 5,
      "employee onboarding" : 5,
      "sourced candidates" : 5,
      "linkedin recruiters" : 5,
      "agency recruiting" : 9,
      "greenhouse" : 5,
      "ats" : 5,
      "computer vision" : 10,
      // "hadoop" : 5,
      "coordinated On-site interviews" : 5,
      "lever" : 5,
      "phr" : 5,
      "machine learning" : 10,
      "deep learning" : 10,
      "statistical analysis" : 5,
      "lider" : 15,
      "strategy" : 20,
      "market" : 15,
      "customer" : 10,
      "client" : 10,
      "brand" : 10,
      "product" : 10,
      "sale" : 10,
      "leader" : 15,
      "diversity" : 10,
      "content" : 10
    }
  }

  getLoopAchievement(){
    return {
      "increas" : 10,
      "led" : 15,
      "%" : 30,
      "decreas" : 10,
      "manag" : 15,
      "automat" : 15,
      "design" : 15,
      "develop" : 20,
      "implement" : 10,
      "perform" : 10,
      "built" : 15,
      "modeled" : 15,
      "improv" : 10,
      "negotiat" : 15,
      "budgeted" : 10,
      "enhanc" : 10,
      "collaborat" : 5,
      "saved" : 15,
      "coordinat" : 5,
      "product" : 10,
      "oversaw" : 15,
      "oversee" : 15,
      "architected" : 20,
      "launch" : 20,
      "served" : 10,
      "serving" : 10,
      "deliver" : 15,
      "responsible" : 10,
      "upgrad" : 15,
      "creat" : 15,
      "provid" : 10,
      "drove" : 15,
      "drive" : 15,
      "build" : 15,
      "spearhead" : 20,
      "lead" : 20,
      "recommend" : 15,
      "sourc" : 10,
      "host" : 15,
      "$" : 30
    }
  }

  getExcludeWords(){
    return [
      "to",
      "by",
      "for",
      "the",
      "and",
      "from",
      "in",
      "or",
      "that",
      "an"
    ];
  }

}
