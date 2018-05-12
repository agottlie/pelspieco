$(function() {

    let movies = ["9", "1408", "(Untitled)", "11th Hour", "12 Angry Men", "127 Hours", "20th Century Women", "4 Months, 3 Weeks, and 2 Days", "A Dangerous Method", "A Ghost Story", "A Hologram for the King", "A Late Quartet", "A Most Violent Year", "A Mouthful", "A Prairie Home Companion", "A Prophet", "A Single Man", "A.I.", "After Hours", "Aguirre, The Wrath Of God", "Ain't Them Bodies Saints", "Alien: Covenant", "All is Lost", "All the Real Girls", "Altered States", "Amelia", "American Gangster", "American Movie", "American Teen", "American: The Bill Hicks Story", "Amores Perros", "Amour", "An Education", "An Inconvenient Truth", "And Everything is Going Fine", "Annihilation", "Another Earth", "Apocalypse Now", "Atonement", "Audition", "Author, the JT Leroy Story", "Bad Lieutenant", "Baghead", "Ballast", "Bamboozled", "Barry Monday", "Bartleby", "Battle Royale", "Beats, Rhymes, & Life", "Beau Travail", "Before Midnight", "Before Sunset", "Being Elmo", "Bellflower", "Berberian Sound Studio", "Beyond the Hills", "Birth of a Nation", "Bitter Moon", "Biutiful", "Black Sheep", "Black Snake Moan", "Blade Runner 2049", "Blindness", "Blue is the Warmest Color", "Body of Lies", "Bottle Rocket", "Brawl in Cell Block 99", "Brazil", "Breakfast on Pluto", "Breaking the Waves", "Brief Interviews with Hideous Men", "Bright Star", "Bronson", "Brothers", "Brothers Bloom", "Bug", "Buried", "Call Me by Your Name", "Call Me Lucky", "Capitalism: A Love Story", "Careful", "Carnage", "Carol", "Cave of Forgotten Dreams", "Cedar Rapids", "Certain Women", "Changeling", "Che", "Chicago 10", "Chinatown", "Choke", "Chop Shop", "Christine", "Chronic", "City of Ember", "City of Men", "Client 9", "Clockers", "Code Unknown", "Cold Fish", "Cold Souls", "Collapse", "Compliance", "Concussion", "Cop Car", "Corman's World", "Cosmopolis", "Crazy Heart", "Crimson Gold", "Crumb", "Crystal Fairy", "Darkest Hour", "Darkest Hour", "Daybreakers", "Dead Man", "Dead Snow", "Dear White People", "Dear Zachary", "Deathtrap", "Deer Hunter", "Dheepan", "Dinosaur 13", "Disappearance of Alice Creed", "Dope", "Drag Me to Hell", "Drugstore Cowboy", "Dune", "Encounters at the End of the World", "Entertainment", "Escape from Tomorrow", "Everything Must Go", "Exotica", "Fallen Angels", "Fan Boys", "Fast, Cheap & Out of Control", "Femme Fatale", "Fences", "Fido", "Firecracker", "Fish Tank", "Fisher King", "Fitzcarraldo ", "Flight", "Force Majeure", "Frank", "Friends with Money", "Frozen River", "Gentlemen Broncos", "Get Low", "Ghost Writer", "Gigantic", "Glengarry Glen Ross", "God's Pocket", "Gomorrah", "Good German", "Good Time", "Goodbye First Love", "Great World of Sound", "Gringo", "Gummo", "Hacksaw Ridge", "Hanna", "Happy Christmas", "Happy Happy", "Harry Brown", "Heart of Glass", "Heavenly Creatures", "High-Rise", "Hobo with a Shotgun", "Holy Hell", "Hood to Coast", "How to Make Money Selling Drugs", "How to Start Your Own Country", "Hugo", "Human Nature", "I am Cuba", "I am Love", "I Killed My Mother", "I Love You Phillip Morris", "I Smile Back", "I Want Someone to Eat Cheese with", "I, Tonya", "I, Tonya", "I'm Still Here", "I’m Not There", "Imaginarium of Dr. Parnassus", "Inside Job", "Into the Abyss", "Irreversible", "It Might Get Loud", "James White", "Jaws", "Jesus is Magic", "Jodorowsky's Dune", "Joe", "Julia", "Junebug", "Killing Them Softly", "King of the Hill", "Kings of New York", "Knight of Cups", "Krisha", "Kumiko, The Treasure Hunter", "Kung Pow", "L.A. Confidential", "L’Enfant", "Last Days", "Last Days in the Desert", "Leaves of Grass", "Less Than Zero", "Leviathan", "Life During Wartime", "Life Itself", "Life of Pi", "Limits of Control", "Lion", "Listen up Philip", "Little Children", "Living in Oblivion", "Louder Than Bombs", "Love Ranch", "Loving", "Lucky", "Lucky Number Slevin", "Mad Max 1", "Mad Max 2", "Mad Max 3", "Magic Magic", "Manchester by the Sea", "Maniac", "Manos: The Hands of Fate", "Married to the Mob", "Mars", "Marwencol", "Mary & Max", "Mascots", "Me & Earl & The Dying Girl", "Mean Streets", "Meek's Cutoff", "Melancholia", "Micmacs a Tire-Larigot", "Millennium Actress", "Millions", "Miracle at St. Anna", "Mission Impossible 4", "Mississippi Grind", "Mistress America", "Molly's Game", "Morris from America", "Motorcycle Diaries", "Mr. Nice", "Mr. Nobody", "My Own Private Idaho", "My Winnipeg", "Mysterious Skin", "Mystery Team", "Nashville", "Near Dark", "Neon Demon", "Network", "Never Let Me Go", "New York, I Love You", "Night Moves", "Ninja Assassin", "Nixon", "No Impact Man", "Nymphomaniac", "On the Road", "Only God Forgives", "Only Lovers Left Alive", "Outside Providence", "Owning Mahoney", "Page One: A Year Inside the New York Times", "Palindromes", "Paper Hearts", "Paper Man", "Paranoid Park", "Payback", "Platoon", "Please Give", "Police, Adjective", "Precious", "Pride and Glory", "Prince Avalanche", "Prisoners", "Public Enemies", "Puffy Chair", "Pulse", "Quick Change", "Rabbit Hole", "Rain Man", "Rampart", "Rams", "Redbelt", "Remarkable Power", "Restless", "Results", "Rich Hill", "Romance and Cigarettes", "Room 237", "Rosewater", "Rubber", "Rudo y Cursi", "Rush", "Rust and Bone", "Saint John of Las Vegas", "Schindler’s List", "Schizopolis", "Science of Sleep", "Search Party", "Secretary", "Senna", "Sexy Beast", "Shadow Dancer", "Shame", "Sherrybaby", "Shoot ‘Em Up", "Short Term 12", "Shotgun Stories", "Shut Up Little Man", "Side Effects", "Sightseers", "Simon Killer", "Slap Shot", "Slasher", "Sling Blade", "Slow West", "Smashed", "Snow Angels", "Son of Saul", "Sonatine", "Songs from the Second Floor", "Spirited Away", "Splice", "Spring Breakers", "State and Main", "Stone", "Stories We Tell", "Strange Days", "Submarine", "Sugar", "Sun Don't Shine", "Sunshine", "Sunshine Cleaners", "Super", "Surveillance", "Swiss Army Man", "Sydney", "Taking Woodstock", "Tale of Tales", "Tangerine", "Tell No One", "Terri", "Tetro", "The Assassination of Jesse James by the Coward Robert Ford", "The Babadook", "The Bank Job", "The Bling Ring", "The Catechism Cataclysm", "The Circle", "The Company Men", "The Congress", "The Conversation", "The Counselor", "The Cove", "The Curious Case of Benjamin Button", "The D Train", "The Deep Blue Sea", "The Details", "The East", "The Extra Man", "The Fall", "The Fits", "The Florida Project", "The Forbidden Room", "The Freebie", "The Future", "The Girlfriend Experience", "The Go-Getter", "The Graduate", "The Greatest Movie Ever Sold", "The Green Zone", "The Guard", "The House I Live in", "The Ice Storm", "The Iceman", "The Ides of March", "The Impossible", "The Informers", "The Interruptors", "The Iron Giant", "The Joneses", "The Killer Inside Me", "The Killing of a Sacred Deer", "The Killing Room", "The Kingdom", "The Kings of Summer", "The Last Gladiators", "The Last Station", "The Ledge", "The Legacy of a Whitetail Deer Hunter", "The Libertine", "The Light Between Oceans", "The Limey", "The Man with the Iron Fists", "The Measure of a Man", "The Men Who Stare at Goats", "The Messenger", "The New World", "The One I Love", "The Overnight", "The Overnighters", "The Paperboy", "The Perfect Host", "The Pianist", "The Post", "The Promotion", "The Queen of Versailles", "The Raid", "The Reader", "The Sessions", "The Shape of Water", "The Shining", "The Skin I Live in", "The Square", "The Thin Red Line", "The Thorn in the Heart", "The Trap", "The TV Set", "The Voices", "The White Ribbon", "The Winning Season", "The Witch", "The Wolfpack", "The Zero Theorem", "This is England", "This Must be the Place", "Tickled", "Tideland", "Time Out", "Timecrimes", "To Hell and Back", "To the Wonder", "Toni Erdmann", "Top Five", "Toy Story 2", "Toy Story 3", "Traitor", "Transsiberian", "Triplets of Belleville", "Troll 2", "Trust", "Two Days, One Night", "Tyson", "U-Turn", "Uncle Boonmee Who Can Recall His Past Lives", "Undertow", "Unforgiven", "United 93", "Valentine Road", "Velvet Goldmine", "Videocracy", "Videodrome", "Virgin Suicides", "Voyage of Time", "Waiting for Superman", "Waking Sleeping Beauty", "War Machine", "Weightless", "Weiner", "Weiner-Dog", "Wendy and Lucy", "What Just Happened", "Whatever Works", "Wild Things", "Wish You Were Here", "World's Largest", "Wristcutters", "Y tu mama tambien", "You Kill Me", "Youth", "Zero Motivation"]
    let genres = [];
    let descriptions = [];
    let all_genres = [{
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ];

    var makeCall = function(query) {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=5d8a82f4af8222c35db864c6cae30bc4&language=en-US&query=${query}&page=1&include_adult=false`,
            type: 'GET'
        }).done(function(data) {
            if (data.results.length > 0) {
                for (j = 0; j < all_genres.length; j++) {
                    if (data.results[0].genre_ids[0] === all_genres[j].id) {
                        genres.push(all_genres[j].name);
                    }
                }
                descriptions.push(data.results[0].overview);
            } else {
                genres.push("N/A");
                descriptions.push("N/A");
            }
        })
    };

    for (i = 0; i < movies.length; i++) {
        makeCall(movies[i]);
    }

    console.log(genres);
    console.log(descriptions);

});