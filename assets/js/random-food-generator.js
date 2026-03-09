// ============ Random Food Generator ============
(function () {
    'use strict';

    // ============ Food Database (355+ foods) ============
    const FOODS = [
        // BREAKFAST (37)
        { name: "Pancakes", category: "Breakfast", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fluffy golden pancakes stacked high, drizzled with maple syrup and butter." },
        { name: "Croissant", category: "Breakfast", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Buttery, crescent-shaped French pastry with a flaky golden crust." },
        { name: "Eggs Benedict", category: "Breakfast", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Poached eggs with hollandaise sauce on English muffins with Canadian bacon." },
        { name: "French Toast", category: "Breakfast", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Bread soaked in egg and milk, pan-fried to golden perfection." },
        { name: "Oatmeal", category: "Breakfast", country: "Scotland", dietType: "Vegan", spiceLevel: "Mild", description: "Warm, creamy oats topped with fruits, nuts, and a drizzle of honey." },
        { name: "Waffles", category: "Breakfast", country: "Belgium", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crispy Belgian waffles with deep pockets, perfect for toppings." },
        { name: "Bagel with Cream Cheese", category: "Breakfast", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Chewy bagel spread with rich, smooth cream cheese." },
        { name: "Shakshuka", category: "Breakfast", country: "Tunisia", dietType: "Vegetarian", spiceLevel: "Spicy", description: "Eggs poached in a spiced tomato and pepper sauce." },
        { name: "Congee", category: "Breakfast", country: "China", dietType: "Gluten Free", spiceLevel: "Mild", description: "Comforting rice porridge slow-cooked to a silky consistency." },
        { name: "Granola Bowl", category: "Breakfast", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crunchy granola with yogurt, fresh berries, and honey." },
        { name: "Breakfast Burrito", category: "Breakfast", country: "Mexico", dietType: "Any", spiceLevel: "Medium", description: "Warm tortilla stuffed with scrambled eggs, beans, cheese, and salsa." },
        { name: "Full English Breakfast", category: "Breakfast", country: "United Kingdom", dietType: "Any", spiceLevel: "Mild", description: "A hearty plate of eggs, bacon, sausages, beans, toast, and tomatoes." },
        { name: "Idli", category: "Breakfast", country: "India", dietType: "Vegan", spiceLevel: "Mild", description: "Steamed rice cakes served with coconut chutney and sambar." },
        { name: "Açaí Bowl", category: "Breakfast", country: "Brazil", dietType: "Vegan", spiceLevel: "Mild", description: "Frozen açaí blend topped with granola, banana, and berries." },
        { name: "Dosa", category: "Breakfast", country: "India", dietType: "Vegan", spiceLevel: "Mild", description: "Crispy fermented rice and lentil crepe served with chutneys and sambar." },
        { name: "Chilaquiles", category: "Breakfast", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Medium", description: "Fried tortilla strips simmered in salsa, topped with cheese and cream." },
        { name: "Medovik", category: "Breakfast", country: "Russia", dietType: "Vegetarian", spiceLevel: "Mild", description: "Layered Russian honey cake with delicate sour cream frosting." },
        { name: "Nasi Goreng", category: "Breakfast", country: "Indonesia", dietType: "Any", spiceLevel: "Medium", description: "Indonesian fried rice with sweet soy sauce, shrimp paste, and a fried egg." },
        { name: "Khachapuri", category: "Breakfast", country: "Georgia", dietType: "Vegetarian", spiceLevel: "Mild", description: "Georgian cheese-filled bread boat topped with a runny egg and butter." },
        { name: "Menemen", category: "Breakfast", country: "Turkey", dietType: "Vegetarian", spiceLevel: "Medium", description: "Turkish scrambled eggs with tomatoes, peppers, and spices." },
        { name: "Porridge", category: "Breakfast", country: "United Kingdom", dietType: "Vegan", spiceLevel: "Mild", description: "Traditional hot oat porridge served with honey, berries, or cream." },
        { name: "Huevos Rancheros", category: "Breakfast", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Medium", description: "Fried eggs on corn tortillas with salsa roja, beans, and avocado." },
        { name: "Kaya Toast", category: "Breakfast", country: "Singapore", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crispy toast layered with butter and sweet coconut egg jam." },
        { name: "Gallo Pinto", category: "Breakfast", country: "Costa Rica", dietType: "Vegetarian", spiceLevel: "Mild", description: "Traditional breakfast of mixed rice and beans with spices." },
        { name: "Appam", category: "Breakfast", country: "India", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fermented rice pancake with a soft center and crispy laced edges." },
        { name: "Msemen", category: "Breakfast", country: "Morocco", dietType: "Vegetarian", spiceLevel: "Mild", description: "Square, flaky Moroccan flatbread served hot with honey and butter." },
        { name: "Cachapa", category: "Breakfast", country: "Venezuela", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sweet fresh corn pancake folded over soft white cheese." },
        { name: "Ackee and Saltfish", category: "Breakfast", country: "Jamaica", dietType: "Any", spiceLevel: "Medium", description: "Jamaica's national dish of salted cod sautéed with boiled ackee fruit." },
        { name: "Pain au Chocolat", category: "Breakfast", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Flaky, buttery pastry rolled around sticks of dark chocolate." },
        { name: "Rösti", category: "Breakfast", country: "Switzerland", dietType: "Vegetarian", spiceLevel: "Mild", description: "Swiss potato fritter, pan-fried until golden and crispy." },
        { name: "Syrniki", category: "Breakfast", country: "Ukraine", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fried Eastern European quark cheese pancakes served with jam." },
        { name: "Tamales", category: "Breakfast", country: "Mexico", dietType: "Any", spiceLevel: "Medium", description: "Masa steamed in a corn husk, filled with meats, cheeses, or beans." },
        { name: "Jianbing", category: "Breakfast", country: "China", dietType: "Any", spiceLevel: "Spicy", description: "Savory Chinese crepe folded with egg, crisp wonton crackers, and hoisin." },
        { name: "Scotch Egg", category: "Breakfast", country: "United Kingdom", dietType: "Any", spiceLevel: "Mild", description: "Soft-boiled egg wrapped in sausage meat, breaded, and deep-fried." },
        { name: "Mangú", category: "Breakfast", country: "Dominican Republic", dietType: "Vegan", spiceLevel: "Mild", description: "Mashed boiled plantains typically served with eggs and fried cheese." },
        { name: "Poha", category: "Breakfast", country: "India", dietType: "Vegetarian", spiceLevel: "Medium", description: "Flattened rice sautéed with turmeric, peanuts, and curry leaves." },
        { name: "Loco Moco", category: "Breakfast", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Rice topped with a hamburger patty, fried egg, and brown gravy." },

        // LUNCH (36)
        { name: "Caesar Salad", category: "Lunch", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crisp romaine lettuce with parmesan, croutons, and creamy Caesar dressing." },
        { name: "Club Sandwich", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Triple-decker sandwich with turkey, bacon, lettuce, and tomato." },
        { name: "Pho", category: "Lunch", country: "Vietnam", dietType: "Gluten Free", spiceLevel: "Medium", description: "Aromatic Vietnamese noodle soup with herbs, bean sprouts, and lime." },
        { name: "Greek Salad", category: "Lunch", country: "Greece", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fresh tomatoes, cucumbers, olives, and feta cheese with olive oil." },
        { name: "BLT Sandwich", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Classic sandwich with crispy bacon, fresh lettuce, and ripe tomato." },
        { name: "Tom Yum Soup", category: "Lunch", country: "Thailand", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Hot and sour Thai soup with shrimp, mushrooms, and lemongrass." },
        { name: "Falafel Wrap", category: "Lunch", country: "Egypt", dietType: "Vegan", spiceLevel: "Medium", description: "Crispy chickpea fritters wrapped in pita with tahini and veggies." },
        { name: "Minestrone Soup", category: "Lunch", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Hearty Italian vegetable soup with pasta and beans." },
        { name: "Onion Soup", category: "Lunch", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Rich French onion soup topped with melted Gruyère cheese." },
        { name: "Quinoa Bowl", category: "Lunch", country: "Peru", dietType: "Vegan", spiceLevel: "Mild", description: "Protein-packed quinoa with roasted vegetables and a tangy dressing." },
        { name: "Gyro", category: "Lunch", country: "Greece", dietType: "Any", spiceLevel: "Mild", description: "Seasoned meat shaved from a vertical rotisserie, wrapped in warm pita." },
        { name: "Banh Mi", category: "Lunch", country: "Vietnam", dietType: "Any", spiceLevel: "Medium", description: "Vietnamese baguette with grilled pork, pickled veggies, and cilantro." },
        { name: "Ramen", category: "Lunch", country: "Japan", dietType: "Any", spiceLevel: "Medium", description: "Japanese noodle soup with rich broth, soft-boiled egg, and chashu pork." },
        { name: "Ceviche", category: "Lunch", country: "Peru", dietType: "Gluten Free", spiceLevel: "Medium", description: "Fresh raw fish marinated in citrus juices with onions, cilantro, and chili." },
        { name: "Bibimbap", category: "Lunch", country: "South Korea", dietType: "Any", spiceLevel: "Medium", description: "Korean mixed rice bowl with vegetables, egg, meat, and gochujang sauce." },
        { name: "Gazpacho", category: "Lunch", country: "Spain", dietType: "Vegan", spiceLevel: "Mild", description: "Chilled Spanish tomato soup blended with peppers, cucumber, and garlic." },
        { name: "Arepas", category: "Lunch", country: "Venezuela", dietType: "Gluten Free", spiceLevel: "Mild", description: "Grilled cornmeal cakes stuffed with cheese, beans, or shredded meat." },
        { name: "Laksa", category: "Lunch", country: "Malaysia", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Spicy coconut curry noodle soup with shrimp, tofu, and fresh herbs." },
        { name: "Souvlaki", category: "Lunch", country: "Greece", dietType: "Gluten Free", spiceLevel: "Mild", description: "Grilled marinated pork skewers served with pita, tzatziki, and salad." },
        { name: "Tortilla Española", category: "Lunch", country: "Spain", dietType: "Vegetarian", spiceLevel: "Mild", description: "Thick Spanish omelette made with eggs, potatoes, and caramelized onions." },
        { name: "Borscht", category: "Lunch", country: "Ukraine", dietType: "Vegetarian", spiceLevel: "Mild", description: "Vibrant beetroot soup served with sour cream and fresh dill." },
        { name: "Bento", category: "Lunch", country: "Japan", dietType: "Any", spiceLevel: "Mild", description: "Japanese single-portion boxed meal of rice, fish or meat, and pickled veggies." },
        { name: "Niçoise Salad", category: "Lunch", country: "France", dietType: "Any", spiceLevel: "Mild", description: "French salad with tuna, green beans, hard-boiled eggs, and olives." },
        { name: "Panini", category: "Lunch", country: "Italy", dietType: "Any", spiceLevel: "Mild", description: "Italian grilled sandwich made with crusty bread and various fillings." },
        { name: "Gumbo", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Spicy", description: "Hearty Louisiana stew made with a dark roux, meat, and the 'holy trinity'." },
        { name: "Jambalaya", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Spicy", description: "Creole rice dish featuring meat, seafood, and vegetables." },
        { name: "Clam Chowder", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Thick, creamy soup filled with clams, potatoes, and onions." },
        { name: "Muffuletta", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "New Orleans sandwich on round bread with layers of meats, cheeses, and olive salad." },
        { name: "Cobb Salad", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Main-dish garden salad with chopped greens, bacon, chicken, egg, and roquefort." },
        { name: "Lobster Roll", category: "Lunch", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Fresh lobster meat tossed in mayo or butter, served in a grilled bun." },
        { name: "Croque Monsieur", category: "Lunch", country: "France", dietType: "Any", spiceLevel: "Mild", description: "Baked or fried boiled ham and cheese sandwich." },
        { name: "Pita Bread", category: "Lunch", country: "Middle East", dietType: "Vegan", spiceLevel: "Mild", description: "Soft, slightly leavened flatbread often baked at high temperatures." },
        { name: "Salmorejo", category: "Lunch", country: "Spain", dietType: "Vegetarian", spiceLevel: "Mild", description: "Thick, cold Spanish tomato soup garnished with diced egg and ham." },
        { name: "Welsh Rarebit", category: "Lunch", country: "United Kingdom", dietType: "Vegetarian", spiceLevel: "Mild", description: "Savory sauce of melted cheese poured over slices of toasted bread." },
        { name: "Koshari", category: "Lunch", country: "Egypt", dietType: "Vegan", spiceLevel: "Medium", description: "Egyptian street food mixing pasta, rice, lentils, and tomato sauce." },
        { name: "Torta", category: "Lunch", country: "Mexico", dietType: "Any", spiceLevel: "Medium", description: "Mexican sandwich served on a soft crusty roll with beans, meats, and avocado." },

        // DINNER (44)
        { name: "Spaghetti Bolognese", category: "Dinner", country: "Italy", dietType: "Any", spiceLevel: "Mild", description: "Classic Italian pasta with a rich, slow-cooked meat sauce." },
        { name: "Sushi", category: "Dinner", country: "Japan", dietType: "Gluten Free", spiceLevel: "Mild", description: "Vinegared rice paired with fresh raw fish and delicate flavors." },
        { name: "Chicken Tikka Masala", category: "Dinner", country: "India", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Tender chicken in a creamy spiced tomato curry sauce." },
        { name: "Steak", category: "Dinner", country: "United States", dietType: "Gluten Free", spiceLevel: "Mild", description: "Perfectly seared beef steak with a juicy, flavorful center." },
        { name: "Paella", category: "Dinner", country: "Spain", dietType: "Gluten Free", spiceLevel: "Medium", description: "Spanish saffron rice with seafood, chicken, and vegetables." },
        { name: "Pad Thai", category: "Dinner", country: "Thailand", dietType: "Gluten Free", spiceLevel: "Medium", description: "Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce." },
        { name: "Lasagna", category: "Dinner", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Layers of pasta, rich meat sauce, and creamy béchamel, baked to perfection." },
        { name: "Butter Chicken", category: "Dinner", country: "India", dietType: "Gluten Free", spiceLevel: "Medium", description: "Tender chicken simmered in a mild, buttery tomato curry." },
        { name: "Jollof Rice", category: "Dinner", country: "Nigeria", dietType: "Vegan", spiceLevel: "Spicy", description: "Fragrant rice cooked in a spicy tomato and pepper stew." },
        { name: "Moussaka", category: "Dinner", country: "Greece", dietType: "Any", spiceLevel: "Mild", description: "Layered eggplant, spiced meat, and creamy béchamel sauce." },
        { name: "Roast Chicken", category: "Dinner", country: "France", dietType: "Gluten Free", spiceLevel: "Mild", description: "Classic roasted chicken with herbs, lemon, and crispy skin." },
        { name: "Goulash", category: "Dinner", country: "Hungary", dietType: "Any", spiceLevel: "Medium", description: "Hearty beef stew seasoned with paprika and served with dumplings." },
        { name: "Chili con Carne", category: "Dinner", country: "United States", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Spicy beef and bean chili with tomatoes, peppers, and chili powder." },
        { name: "Biryani", category: "Dinner", country: "India", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Aromatic basmati rice layered with spiced meat and caramelized onions." },
        { name: "Fish and Chips", category: "Dinner", country: "United Kingdom", dietType: "Any", spiceLevel: "Mild", description: "Beer-battered fish with crispy golden chips and tartar sauce." },
        { name: "Tacos", category: "Dinner", country: "Mexico", dietType: "Gluten Free", spiceLevel: "Medium", description: "Corn tortillas filled with seasoned meat, salsa, and fresh toppings." },
        { name: "Peking Duck", category: "Dinner", country: "China", dietType: "Any", spiceLevel: "Mild", description: "Crispy-skinned roasted duck served with thin pancakes and hoisin sauce." },
        { name: "Lamb Chops", category: "Dinner", country: "New Zealand", dietType: "Gluten Free", spiceLevel: "Mild", description: "Herb-crusted lamb chops grilled to perfection with rosemary." },
        { name: "Coq au Vin", category: "Dinner", country: "France", dietType: "Gluten Free", spiceLevel: "Mild", description: "Classic French braised chicken in red wine with mushrooms and onions." },
        { name: "Jollof Rice", category: "Dinner", country: "Nigeria", dietType: "Gluten Free", spiceLevel: "Medium", description: "West African one-pot rice dish cooked in a rich tomato sauce." },
        { name: "Rendang", category: "Dinner", country: "Indonesia", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Indonesian slow-cooked dry curry with tender beef and coconut." },
        { name: "Osso Buco", category: "Dinner", country: "Italy", dietType: "Gluten Free", spiceLevel: "Mild", description: "Braised veal shanks slow-cooked in white wine, broth, and gremolata." },
        { name: "Cacio e Pepe", category: "Dinner", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Roman pasta with sharp Pecorino cheese and freshly cracked black pepper." },
        { name: "Bulgogi", category: "Dinner", country: "South Korea", dietType: "Gluten Free", spiceLevel: "Medium", description: "Thinly sliced marinated beef grilled over open flame with sweet soy glaze." },
        { name: "Tagine", category: "Dinner", country: "Morocco", dietType: "Gluten Free", spiceLevel: "Medium", description: "Slow-cooked Moroccan stew with tender meat, dried fruits, and warm spices." },
        { name: "Pierogi", category: "Dinner", country: "Poland", dietType: "Vegetarian", spiceLevel: "Mild", description: "Polish dumplings filled with potato, cheese, or sauerkraut, pan-fried in butter." },
        { name: "Chicken Adobo", category: "Dinner", country: "Philippines", dietType: "Gluten Free", spiceLevel: "Mild", description: "Filipino braised chicken in vinegar, soy sauce, garlic, and bay leaves." },
        { name: "Sauerbraten", category: "Dinner", country: "Germany", dietType: "Any", spiceLevel: "Mild", description: "German pot roast marinated in vinegar and spices, served with red cabbage." },
        { name: "Massaman Curry", category: "Dinner", country: "Thailand", dietType: "Gluten Free", spiceLevel: "Medium", description: "Rich Thai curry with peanuts, potatoes, and tender slow-cooked beef." },
        { name: "Mole Poblano", category: "Dinner", country: "Mexico", dietType: "Gluten Free", spiceLevel: "Medium", description: "Complex Mexican sauce with chocolate, chilies, and spices over chicken." },
        { name: "Beef Wellington", category: "Dinner", country: "United Kingdom", dietType: "Any", spiceLevel: "Mild", description: "Tender beef fillet coated in pâté, wrapped in puff pastry, and baked." },
        { name: "Bratwurst", category: "Dinner", country: "Germany", dietType: "Any", spiceLevel: "Mild", description: "Traditional German sausage grilled and served with mustard and sauerkraut." },
        { name: "Feijoada", category: "Dinner", country: "Brazil", dietType: "Any", spiceLevel: "Mild", description: "Black bean and pork stew, recognized as Brazil's national dish." },
        { name: "Cassoulet", category: "Dinner", country: "France", dietType: "Any", spiceLevel: "Mild", description: "Slow-cooked French casserole containing white beans, pork, and sausages." },
        { name: "Bouillabaisse", category: "Dinner", country: "France", dietType: "Gluten Free", spiceLevel: "Mild", description: "Traditional Provençal fish stew flavored with saffron and fennel." },
        { name: "Plov", category: "Dinner", country: "Uzbekistan", dietType: "Gluten Free", spiceLevel: "Mild", description: "Hearty rice pilaf dish with lamb, carrots, and aromatic spices." },
        { name: "Hainanese Chicken Rice", category: "Dinner", country: "Singapore", dietType: "Gluten Free", spiceLevel: "Mild", description: "Poached chicken and rice infused with ginger, garlic, and pandan leaves." },
        { name: "Pad Kra Pao", category: "Dinner", country: "Thailand", dietType: "Any", spiceLevel: "Spicy", description: "Spicy Thai stir-fry of minced meat with holy basil and chili." },
        { name: "Pastitsio", category: "Dinner", country: "Greece", dietType: "Any", spiceLevel: "Mild", description: "Baked Greek dish made with layers of tubular pasta, meat, and béchamel." },
        { name: "Raclette", category: "Dinner", country: "Switzerland", dietType: "Gluten Free", spiceLevel: "Mild", description: "Melted Swiss cheese scraped over potatoes, pickles, and meats." },
        { name: "Fondue", category: "Dinner", country: "Switzerland", dietType: "Vegetarian", spiceLevel: "Mild", description: "Melted cheese dish served in a communal pot into which bread is dipped." },
        { name: "Shabu-shabu", category: "Dinner", country: "Japan", dietType: "Any", spiceLevel: "Mild", description: "Japanese hot pot dish of thinly sliced meat and vegetables boiled in water." },
        { name: "Carnitas", category: "Dinner", country: "Mexico", dietType: "Gluten Free", spiceLevel: "Mild", description: "Mexican pulled pork that is braised or roasted until tender." },
        { name: "Wiener Schnitzel", category: "Dinner", country: "Austria", dietType: "Any", spiceLevel: "Mild", description: "Thin, breaded, and pan-fried veal cutlet." },

        // DESSERT (37)
        { name: "Tiramisu", category: "Dessert", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Italian coffee-flavored dessert with mascarpone and cocoa." },
        { name: "Chocolate Cake", category: "Dessert", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Rich, moist chocolate cake with creamy chocolate ganache frosting." },
        { name: "Crème Brûlée", category: "Dessert", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Rich custard topped with a layer of crispy caramelized sugar." },
        { name: "Mochi", category: "Dessert", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Soft, chewy Japanese rice cakes with sweet filling." },
        { name: "Baklava", category: "Dessert", country: "Turkey", dietType: "Vegetarian", spiceLevel: "Mild", description: "Layers of crispy filo pastry with nuts and sweet honey syrup." },
        { name: "Churros", category: "Dessert", country: "Spain", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fried dough strips coated in cinnamon sugar with chocolate dip." },
        { name: "Gelato", category: "Dessert", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Italian-style ice cream with intense flavor and silky texture." },
        { name: "Panna Cotta", category: "Dessert", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Silky Italian cream dessert set with gelatin and topped with berries." },
        { name: "Gulab Jamun", category: "Dessert", country: "India", dietType: "Vegetarian", spiceLevel: "Mild", description: "Deep-fried milk dumplings soaked in fragrant rose-cardamom syrup." },
        { name: "Crêpes", category: "Dessert", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Thin French pancakes filled with Nutella, fruits, or cream." },
        { name: "Cheesecake", category: "Dessert", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Creamy baked cheesecake on a buttery graham cracker crust." },
        { name: "Mango Sticky Rice", category: "Dessert", country: "Thailand", dietType: "Vegan", spiceLevel: "Mild", description: "Sweet sticky rice with ripe mango and coconut cream." },
        { name: "Cannoli", category: "Dessert", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crispy pastry tubes filled with sweet ricotta cream and chocolate chips." },
        { name: "Brigadeiro", category: "Dessert", country: "Brazil", dietType: "Vegetarian", spiceLevel: "Mild", description: "Brazilian chocolate truffles rolled in chocolate sprinkles." },
        { name: "Pavlova", category: "Dessert", country: "Australia", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crispy meringue shell with a soft marshmallow center, topped with fresh fruit." },
        { name: "Tarte Tatin", category: "Dessert", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Upside-down caramelized apple tart with golden puff pastry." },
        { name: "Tres Leches Cake", category: "Dessert", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sponge cake soaked in three kinds of milk, topped with whipped cream." },
        { name: "Rasgulla", category: "Dessert", country: "India", dietType: "Vegetarian", spiceLevel: "Mild", description: "Soft spongy cottage cheese balls soaked in light sugar syrup." },
        { name: "Profiterole", category: "Dessert", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Choux pastry puffs filled with cream and drizzled with warm chocolate." },
        { name: "Alfajores", category: "Dessert", country: "Argentina", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crumbly shortbread cookies sandwiched with dulce de leche." },
        { name: "Kunafa", category: "Dessert", country: "Palestine", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crispy shredded pastry filled with sweet cheese and soaked in syrup." },
        { name: "Dorayaki", category: "Dessert", country: "Japan", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fluffy Japanese pancakes sandwiched with sweet red bean paste." },
        { name: "Éclair", category: "Dessert", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Oblong choux pastry filled with cream and topped with chocolate icing." },
        { name: "Macaron", category: "Dessert", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sweet meringue-based confection with ganache, buttercream, or jam." },
        { name: "Flan", category: "Dessert", country: "Spain", dietType: "Vegetarian", spiceLevel: "Mild", description: "Custard dessert with a layer of clear caramel sauce." },
        { name: "Sticky Toffee Pudding", category: "Dessert", country: "United Kingdom", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sponge cake filled with dates and covered in a toffee sauce." },
        { name: "Black Forest Gâteau", category: "Dessert", country: "Germany", dietType: "Vegetarian", spiceLevel: "Mild", description: "Chocolate sponge cake layered with cream and cherries." },
        { name: "Banoffee Pie", category: "Dessert", country: "United Kingdom", dietType: "Vegetarian", spiceLevel: "Mild", description: "English dessert pie made from bananas, cream, and toffee." },
        { name: "Victoria Sponge", category: "Dessert", country: "United Kingdom", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sponge cake with raspberry jam and whipped double cream." },
        { name: "Red Velvet Cake", category: "Dessert", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crimson-colored layer cake topped with cream cheese icing." },
        { name: "Key Lime Pie", category: "Dessert", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "American dessert pie made of Key lime juice, egg yolks, and sweet milk." },
        { name: "Apple Pie", category: "Dessert", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Classic dessert pie with an apple filling and a flaky crust." },
        { name: "Pecan Pie", category: "Dessert", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Pie made of pecans mixed with a filling of eggs, butter, and sugar." },
        { name: "Bingsu", category: "Dessert", country: "South Korea", dietType: "Vegetarian", spiceLevel: "Mild", description: "Korean shaved ice dessert with sweet toppings such as chopped fruit." },
        { name: "Tanghulu", category: "Dessert", country: "China", dietType: "Vegan", spiceLevel: "Mild", description: "Traditional Chinese snack of candied fruit on bamboo skewers." },
        { name: "Loukoumades", category: "Dessert", country: "Greece", dietType: "Vegetarian", spiceLevel: "Mild", description: "Deep-fried dough pastries soaked in honey syrup and sprinkled with cinnamon." },
        { name: "Qatayef", category: "Dessert", country: "Middle East", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sweet dumpling filled with cream or nuts, popular during Ramadan." },

        // SNACK (35)
        { name: "Nachos", category: "Snack", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Medium", description: "Tortilla chips loaded with melted cheese, jalapeños, and salsa." },
        { name: "Spring Rolls", category: "Snack", country: "China", dietType: "Vegan", spiceLevel: "Mild", description: "Crispy rolls filled with vegetables and served with sweet chili sauce." },
        { name: "Samosa", category: "Snack", country: "India", dietType: "Vegan", spiceLevel: "Spicy", description: "Crispy triangular pastry filled with spiced potatoes and peas." },
        { name: "Hummus with Pita", category: "Snack", country: "Lebanon", dietType: "Vegan", spiceLevel: "Mild", description: "Creamy chickpea dip with olive oil, served with warm pita bread." },
        { name: "Onion Rings", category: "Snack", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Thick-cut onion rings in a crispy batter, deep-fried golden." },
        { name: "Edamame", category: "Snack", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Steamed young soybeans lightly salted — a perfect healthy snack." },
        { name: "Bruschetta", category: "Snack", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Toasted bread topped with fresh tomatoes, basil, and olive oil." },
        { name: "Empanada", category: "Snack", country: "Argentina", dietType: "Any", spiceLevel: "Mild", description: "Savory pastry stuffed with seasoned meat, onions, and olives." },
        { name: "Pretzels", category: "Snack", country: "Germany", dietType: "Vegan", spiceLevel: "Mild", description: "Soft, twisted bread with a golden crust and coarse salt." },
        { name: "Trail Mix", category: "Snack", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "A mix of nuts, dried fruits, seeds, and chocolate chips." },
        { name: "Pão de Queijo", category: "Snack", country: "Brazil", dietType: "Gluten Free", spiceLevel: "Mild", description: "Brazilian cheese bread balls made from tapioca flour." },
        { name: "Dim Sum", category: "Snack", country: "China", dietType: "Any", spiceLevel: "Mild", description: "Assorted steamed dumplings with savory and sweet fillings." },
        { name: "Arancini", category: "Snack", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Crispy fried risotto balls stuffed with mozzarella and ragù." },
        { name: "Takoyaki", category: "Snack", country: "Japan", dietType: "Any", spiceLevel: "Mild", description: "Golden Japanese octopus balls drizzled with savory sauce and bonito flakes." },
        { name: "Pakora", category: "Snack", country: "India", dietType: "Vegan", spiceLevel: "Spicy", description: "Crunchy Indian fritters made with spiced chickpea batter and vegetables." },
        { name: "Churro Bites", category: "Snack", country: "Spain", dietType: "Vegetarian", spiceLevel: "Mild", description: "Bite-sized fried dough pieces dusted with cinnamon sugar." },
        { name: "Gimbap", category: "Snack", country: "South Korea", dietType: "Any", spiceLevel: "Mild", description: "Korean seaweed rice rolls filled with vegetables, egg, and meat." },
        { name: "Croquetas", category: "Snack", country: "Spain", dietType: "Any", spiceLevel: "Mild", description: "Creamy béchamel fritters with ham, breaded and fried until golden." },
        { name: "Lumpia", category: "Snack", country: "Philippines", dietType: "Any", spiceLevel: "Mild", description: "Filipino crispy spring rolls filled with seasoned ground pork and vegetables." },
        { name: "Baba Ganoush", category: "Snack", country: "Lebanon", dietType: "Vegan", spiceLevel: "Mild", description: "Smoky roasted eggplant dip blended with tahini, lemon, and garlic." },
        { name: "Pork Rinds", category: "Snack", country: "Global", dietType: "Gluten Free", spiceLevel: "Mild", description: "Crunchy roasted or fried skin of a pig." },
        { name: "Beef Jerky", category: "Snack", country: "United States", dietType: "Gluten Free", spiceLevel: "Medium", description: "Lean meat dried to prevent spoilage, often marinated or spiced." },
        { name: "Popcorn", category: "Snack", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Corn kernels that expand and puff up when heated." },
        { name: "Potato Chips", category: "Snack", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Thin slices of potato baked or deep-fried until crisp." },
        { name: "Tortilla Chips", category: "Snack", country: "Mexico", dietType: "Vegan", spiceLevel: "Mild", description: "Snack made from corn tortillas cut into triangles and fried." },
        { name: "Plantain Chips", category: "Snack", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Sliced and fried green or ripe plantains, sweet or savory." },
        { name: "Calçots", category: "Snack", country: "Spain", dietType: "Vegan", spiceLevel: "Mild", description: "A type of green onion grilled over an open fire and dipped in romesco sauce." },
        { name: "Pigs in a Blanket", category: "Snack", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Small sausages wrapped in croissant dough and baked." },
        { name: "Cheese Board", category: "Snack", country: "Global", dietType: "Vegetarian", spiceLevel: "Mild", description: "Assortment of cheeses, often paired with crackers, fruits, and nuts." },
        { name: "Olives", category: "Snack", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Small oval fruits that are cured and fermented before eating." },
        { name: "Roasted Chestnuts", category: "Snack", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Chestnuts roasted to perfection, offering a sweet and earthy flavor." },
        { name: "Prawn Crackers", category: "Snack", country: "Asia", dietType: "Gluten Free", spiceLevel: "Mild", description: "Deep-fried snack made from starch and prawn that puffs up crisp." },
        { name: "Pandebono", category: "Snack", country: "Colombia", dietType: "Vegetarian", spiceLevel: "Mild", description: "Colombian cheese bread made from cassava starch and cheese." },
        { name: "Bhujia", category: "Snack", country: "India", dietType: "Vegan", spiceLevel: "Spicy", description: "Crispy snack made from gram flour, moth beans, and spices." },
        { name: "Gordita", category: "Snack", country: "Mexico", dietType: "Any", spiceLevel: "Medium", description: "Small, thick pastry made with masa and stuffed with various fillings." },

        // FAST FOOD (32)
        { name: "Cheeseburger", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Juicy beef patty with melted cheese, lettuce, tomato, and pickles." },
        { name: "Pizza", category: "Fast Food", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Thin-crust pizza with rich tomato sauce, mozzarella, and fresh basil." },
        { name: "Hot Dog", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Grilled sausage in a soft bun with mustard, ketchup, and relish." },
        { name: "Fried Chicken", category: "Fast Food", country: "United States", dietType: "Gluten Free", spiceLevel: "Medium", description: "Crispy, seasoned fried chicken with a juicy tender inside." },
        { name: "French Fries", category: "Fast Food", country: "Belgium", dietType: "Vegan", spiceLevel: "Mild", description: "Golden, crispy potato fries seasoned with salt — a universal favorite." },
        { name: "Kebab", category: "Fast Food", country: "Turkey", dietType: "Gluten Free", spiceLevel: "Medium", description: "Spiced grilled meat on a skewer, served with flatbread and sauces." },
        { name: "Chicken Nuggets", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Bite-sized breaded chicken pieces, crispy on the outside and tender inside." },
        { name: "Fish Tacos", category: "Fast Food", country: "Mexico", dietType: "Any", spiceLevel: "Medium", description: "Battered fish in soft tortillas with slaw, lime, and crema." },
        { name: "Shawarma", category: "Fast Food", country: "Lebanon", dietType: "Any", spiceLevel: "Medium", description: "Thinly sliced marinated meat wrapped in flatbread with garlic sauce." },
        { name: "Corn Dog", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Hot dog on a stick coated in cornmeal batter and deep-fried." },
        { name: "Doner Kebab", category: "Fast Food", country: "Germany", dietType: "Any", spiceLevel: "Medium", description: "Sliced rotisserie meat in bread with salad, onions, and sauces." },
        { name: "Poutine", category: "Fast Food", country: "Canada", dietType: "Any", spiceLevel: "Mild", description: "Crispy fries topped with cheese curds and rich brown gravy." },
        { name: "Currywurst", category: "Fast Food", country: "Germany", dietType: "Any", spiceLevel: "Medium", description: "Sliced bratwurst smothered in curried ketchup with fries on the side." },
        { name: "Bao Buns", category: "Fast Food", country: "China", dietType: "Any", spiceLevel: "Mild", description: "Soft steamed buns filled with tender braised pork belly and pickled veggies." },
        { name: "Jerk Chicken", category: "Fast Food", country: "Jamaica", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Smoky grilled chicken marinated in scotch bonnet peppers and allspice." },
        { name: "Pupusa", category: "Fast Food", country: "El Salvador", dietType: "Gluten Free", spiceLevel: "Mild", description: "Thick corn tortilla stuffed with cheese, beans, and chicharrón." },
        { name: "Satay", category: "Fast Food", country: "Indonesia", dietType: "Gluten Free", spiceLevel: "Medium", description: "Grilled marinated meat skewers served with spicy peanut dipping sauce." },
        { name: "Chili Dog", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Medium", description: "Hot dog served in a bun and topped with meat sauce, cheese, and onions." },
        { name: "Submarine Sandwich", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Long roll split lengthwise and filled with meats, cheeses, and vegetables." },
        { name: "Fried Rice", category: "Fast Food", country: "China", dietType: "Any", spiceLevel: "Mild", description: "Wok-tossed rice with vegetables, egg, and soy sauce." },
        { name: "Lo Mein", category: "Fast Food", country: "China", dietType: "Any", spiceLevel: "Mild", description: "Chinese egg noodles stir-fried with vegetables and meat." },
        { name: "Buffalo Wings", category: "Fast Food", country: "United States", dietType: "Gluten Free", spiceLevel: "Spicy", description: "Deep-fried unbreaded chicken wings coated in a vinegar-based cayenne pepper hot sauce." },
        { name: "Dürüm", category: "Fast Food", country: "Turkey", dietType: "Any", spiceLevel: "Medium", description: "Turkish wrap usually filled with typical döner kebab ingredients." },
        { name: "Taquito", category: "Fast Food", country: "Mexico", dietType: "Gluten Free", spiceLevel: "Medium", description: "Small rolled-up tortilla containing filling, crisp-fried." },
        { name: "Burrito", category: "Fast Food", country: "Mexico", dietType: "Any", spiceLevel: "Medium", description: "Flour tortilla rolled into a cylinder, packed with rice, beans, and meat." },
        { name: "Chimichanga", category: "Fast Food", country: "Mexico", dietType: "Any", spiceLevel: "Spicy", description: "Deep-fried burrito popular in Tex-Mex cuisine." },
        { name: "Macaroni and Cheese", category: "Fast Food", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Cooked macaroni pasta and a cheese sauce, most commonly cheddar." },
        { name: "Sloppy Joe", category: "Fast Food", country: "United States", dietType: "Any", spiceLevel: "Medium", description: "Sandwich of ground beef, onions, tomato sauce, served on a hamburger bun." },
        { name: "Tater Tots", category: "Fast Food", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Grated potatoes formed into small cylinders and deep-fried." },
        { name: "Mozzarella Sticks", category: "Fast Food", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Elongated pieces of battered or breaded mozzarella, deep-fried." },
        { name: "Patatas Bravas", category: "Fast Food", country: "Spain", dietType: "Vegan", spiceLevel: "Medium", description: "Fried potato cubes served warm with a spicy tomato sauce." },
        { name: "Fish Cake", category: "Fast Food", country: "Global", dietType: "Any", spiceLevel: "Mild", description: "Minced or ground fish mixed with a starchy ingredient, and fried." },

        // HEALTHY FOOD (41)
        { name: "Avocado Toast", category: "Healthy Food", country: "Australia", dietType: "Vegan", spiceLevel: "Mild", description: "Mashed avocado on toasted sourdough with lemon and red pepper flakes." },
        { name: "Grilled Salmon", category: "Healthy Food", country: "Norway", dietType: "Gluten Free", spiceLevel: "Mild", description: "Omega-rich salmon fillet grilled with herbs and lemon." },
        { name: "Buddha Bowl", category: "Healthy Food", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "A nourishing bowl of grains, roasted veggies, and tahini dressing." },
        { name: "Chicken Breast Salad", category: "Healthy Food", country: "United States", dietType: "Gluten Free", spiceLevel: "Mild", description: "Lean grilled chicken breast on a bed of mixed greens." },
        { name: "Smoothie Bowl", category: "Healthy Food", country: "Brazil", dietType: "Vegan", spiceLevel: "Mild", description: "Thick blended fruits in a bowl topped with seeds, nuts, and coconut." },
        { name: "Steamed Vegetables", category: "Healthy Food", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "A colorful medley of fresh vegetables gently steamed to perfection." },
        { name: "Lentil Soup", category: "Healthy Food", country: "Turkey", dietType: "Vegan", spiceLevel: "Mild", description: "Hearty, protein-rich red lentil soup with cumin and lemon." },
        { name: "Grilled Chicken Wrap", category: "Healthy Food", country: "United States", dietType: "Any", spiceLevel: "Mild", description: "Grilled chicken with vegetables and light dressing in a whole wheat wrap." },
        { name: "Overnight Oats", category: "Healthy Food", country: "Switzerland", dietType: "Vegan", spiceLevel: "Mild", description: "Oats soaked overnight in almond milk with chia seeds and berries." },
        { name: "Tabbouleh", category: "Healthy Food", country: "Lebanon", dietType: "Vegan", spiceLevel: "Mild", description: "Fresh parsley salad with bulgur wheat, tomatoes, mint, and lemon juice." },
        { name: "Poke Bowl", category: "Healthy Food", country: "United States", dietType: "Gluten Free", spiceLevel: "Mild", description: "Hawaiian-inspired bowl with raw fish, rice, and fresh toppings." },
        { name: "Miso Soup", category: "Healthy Food", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Light Japanese soup with fermented soybean paste, tofu, and wakame seaweed." },
        { name: "Fattoush", category: "Healthy Food", country: "Lebanon", dietType: "Vegan", spiceLevel: "Mild", description: "Lebanese bread salad with crispy pita chips, vegetables, and sumac dressing." },
        { name: "Açaí Bowl", category: "Healthy Food", country: "Brazil", dietType: "Vegan", spiceLevel: "Mild", description: "Thick frozen açaí base topped with granola, fresh fruit, and honey drizzle." },
        { name: "Quinoa Salad", category: "Healthy Food", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Fluffy quinoa tossed with fresh vegetables, herbs, and lemon vinaigrette." },
        { name: "Edamame Beans", category: "Healthy Food", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Young soybeans steamed in their pods and lightly salted." },
        { name: "Kale Salad", category: "Healthy Food", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Massaged kale leaves with nuts, seeds, and a light dressing." },
        { name: "Roasted Chickpeas", category: "Healthy Food", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Crunchy oven-roasted chickpeas seasoned with spices." },
        { name: "Farro Salad", category: "Healthy Food", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Nutty ancient grain mixed with Mediterranean vegetables and feta." },
        { name: "Baked Sweet Potato", category: "Healthy Food", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Oven-baked sweet potato loaded with healthy toppings." },
        { name: "Stuffed Bell Peppers", category: "Healthy Food", country: "Global", dietType: "Any", spiceLevel: "Mild", description: "Peppers hollowed and baked with a filling of grains and veggies." },
        { name: "Zucchini Noodles", category: "Healthy Food", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Spiralized zucchini ribbons served as a low-carb pasta alternative." },
        { name: "Greek Yogurt with Honey", category: "Healthy Food", country: "Greece", dietType: "Vegetarian", spiceLevel: "Mild", description: "Thick strained yogurt drizzled with honey and topped with walnuts." },
        { name: "Spaghetti Squash", category: "Healthy Food", country: "North America", dietType: "Vegan", spiceLevel: "Mild", description: "Roasted winter squash with flesh that scrapes out like pasta strands." },
        { name: "Seaweed Salad", category: "Healthy Food", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Light and refreshing salad made of thinly sliced wakame seaweed." },
        { name: "Caponata", category: "Healthy Food", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Sicilian eggplant relish with celery, capers, and a sweet-and-sour sauce." },
        { name: "Gazpacho", category: "Healthy Food", country: "Spain", dietType: "Vegan", spiceLevel: "Mild", description: "Cold Spanish soup made of raw, blended vegetables." },
        { name: "Ceviche", category: "Healthy Food", country: "Peru", dietType: "Gluten Free", spiceLevel: "Mild", description: "Fresh raw fish cured in citrus juices, spiced with pepper." },
        { name: "Muesli", category: "Healthy Food", country: "Switzerland", dietType: "Vegan", spiceLevel: "Mild", description: "Cold Swiss breakfast dish made with rolled oats, fresh or dried fruits, and nuts." },
        { name: "Kimchi", category: "Healthy Food", country: "South Korea", dietType: "Any", spiceLevel: "Spicy", description: "Traditional Korean side dish of salted and fermented vegetables." },
        { name: "Sauerkraut", category: "Healthy Food", country: "Germany", dietType: "Vegan", spiceLevel: "Mild", description: "Finely cut raw cabbage that has been fermented." },
        { name: "Kefir", category: "Healthy Food", country: "Russia", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fermented milk drink from the Caucasus Mountains." },
        { name: "Guacamole", category: "Healthy Food", country: "Mexico", dietType: "Vegan", spiceLevel: "Mild", description: "Avocado-based dip or salad first developed in Mexico." },
        { name: "Tzatziki", category: "Healthy Food", country: "Greece", dietType: "Vegetarian", spiceLevel: "Mild", description: "Creamy Greek dip made of salted strained yogurt, cucumbers, and garlic." },
        { name: "Nattō", category: "Healthy Food", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Traditional Japanese food made from whole soybeans that have been fermented." },
        { name: "Kombu", category: "Healthy Food", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Edible kelp widely consumed in East Asia." },
        { name: "Goji Berries", category: "Healthy Food", country: "China", dietType: "Vegan", spiceLevel: "Mild", description: "Bright red berries prized for their health benefits in traditional medicine." },
        { name: "Soba Noodles", category: "Healthy Food", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Thin Japanese noodles made from buckwheat flour." },
        { name: "Watermelon Salad", category: "Healthy Food", country: "Global", dietType: "Vegetarian", spiceLevel: "Mild", description: "Refreshing summer salad featuring cubed watermelon, feta, and mint." },
        { name: "Shirazi Salad", category: "Healthy Food", country: "Iran", dietType: "Vegan", spiceLevel: "Mild", description: "Persian cucumber, tomato, and onion salad flavored with verjuice or lemon." },
        { name: "Som Tum", category: "Healthy Food", country: "Thailand", dietType: "Any", spiceLevel: "Spicy", description: "Spicy green papaya salad pounded in a mortar with chili and lime." },

        // VEGETARIAN (31)
        { name: "Margherita Pizza", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Classic pizza with tomato sauce, fresh mozzarella, and basil leaves." },
        { name: "Caprese Salad", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fresh mozzarella, ripe tomatoes, and basil drizzled with balsamic glaze." },
        { name: "Mushroom Risotto", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Creamy Arborio rice cooked with wild mushrooms and parmesan cheese." },
        { name: "Paneer Tikka", category: "Vegetarian", country: "India", dietType: "Vegetarian", spiceLevel: "Spicy", description: "Marinated paneer cubes grilled in a tandoor with bell peppers." },
        { name: "Vegetable Stir Fry", category: "Vegetarian", country: "China", dietType: "Vegan", spiceLevel: "Medium", description: "Crispy vegetables wok-tossed with soy sauce and garlic." },
        { name: "Eggplant Parmesan", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Breaded eggplant slices baked with marinara sauce and melted cheese." },
        { name: "Spinach & Ricotta Ravioli", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fresh pasta pockets filled with spinach and creamy ricotta cheese." },
        { name: "Chana Masala", category: "Vegetarian", country: "India", dietType: "Vegan", spiceLevel: "Spicy", description: "Spiced chickpea curry cooked in a tangy tomato-based sauce." },
        { name: "Cheese Quesadilla", category: "Vegetarian", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Mild", description: "Grilled tortilla filled with melted cheese, peppers, and onions." },
        { name: "Palak Paneer", category: "Vegetarian", country: "India", dietType: "Vegetarian", spiceLevel: "Medium", description: "Soft paneer cubes in a creamy spiced spinach gravy." },
        { name: "Aloo Gobi", category: "Vegetarian", country: "India", dietType: "Vegan", spiceLevel: "Medium", description: "Spiced cauliflower and potato curry with turmeric and cumin." },
        { name: "Spanakopita", category: "Vegetarian", country: "Greece", dietType: "Vegetarian", spiceLevel: "Mild", description: "Flaky filo pastry filled with spinach, feta cheese, and herbs." },
        { name: "Ratatouille", category: "Vegetarian", country: "France", dietType: "Vegan", spiceLevel: "Mild", description: "Provençal vegetable stew with eggplant, zucchini, and tomatoes." },
        { name: "Gnocchi", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Soft Italian potato dumplings tossed in sage brown butter sauce." },
        { name: "Saag Paneer", category: "Vegetarian", country: "India", dietType: "Vegetarian", spiceLevel: "Medium", description: "Cottage cheese cubes simmered in a rich, spiced mustard greens gravy." },
        { name: "Shakshuka Green", category: "Vegetarian", country: "Israel", dietType: "Vegetarian", spiceLevel: "Medium", description: "Eggs poached in a vibrant green sauce of spinach, herbs, and feta." },
        { name: "Mac and Cheese", category: "Vegetarian", country: "United States", dietType: "Vegetarian", spiceLevel: "Mild", description: "Classic oven-baked dish consisting of macaroni pasta and a cheese sauce." },
        { name: "Eggplant Parmigiana", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sliced eggplant layered with cheese and tomato sauce, then baked." },
        { name: "Aloo Tikki", category: "Vegetarian", country: "India", dietType: "Vegan", spiceLevel: "Medium", description: "Golden fried potato patties spiced with herbs and cumin." },
        { name: "Malai Kofta", category: "Vegetarian", country: "India", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fried dumpling balls made of potato and paneer in a rich, creamy gravy." },
        { name: "Vegetable Samosa", category: "Vegetarian", country: "India", dietType: "Vegan", spiceLevel: "Spicy", description: "Crispy fried pastry filled with spiced potatoes, peas, and lentils." },
        { name: "Tiropita", category: "Vegetarian", country: "Greece", dietType: "Vegetarian", spiceLevel: "Mild", description: "Greek pastry made with layers of buttered phyllo and a cheese-egg filling." },
        { name: "Caprese Sandwich", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Fresh mozzarella, tomatoes, and sweet basil layered on ciabatta bread." },
        { name: "Stuffed Shells", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Jumbo pasta shells filled with ricotta cheese mixture and baked in marinara." },
        { name: "Vegetable Tian", category: "Vegetarian", country: "France", dietType: "Vegan", spiceLevel: "Mild", description: "Beautifully layered and roasted summer vegetables seasoned with thyme." },
        { name: "Quattro Formaggi Pizza", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Pizza topped with a luxurious combination of four different cheeses." },
        { name: "Mushroom Wellington", category: "Vegetarian", country: "United Kingdom", dietType: "Vegetarian", spiceLevel: "Mild", description: "Savory mushroom and herb mixture wrapped in flaky puff pastry." },
        { name: "Truffle Risotto", category: "Vegetarian", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "Creamy arborio rice infused with the earthy, rich flavor of truffles." },
        { name: "Halloumi Cheese", category: "Vegetarian", country: "Cyprus", dietType: "Vegetarian", spiceLevel: "Mild", description: "Squeaky, semi-hard cheese that is often grilled or pan-fried." },
        { name: "Gougères", category: "Vegetarian", country: "France", dietType: "Vegetarian", spiceLevel: "Mild", description: "Baked savory choux pastry made with cheese." },
        { name: "Focaccia", category: "Vegetarian", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Flat leavened oven-baked Italian bread, often topped with herbs." },

        // VEGAN (31)
        { name: "Vegan Buddha Bowl", category: "Vegan", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Colorful bowl with quinoa, avocado, chickpeas, and tahini dressing." },
        { name: "Dal Tadka", category: "Vegan", country: "India", dietType: "Vegan", spiceLevel: "Medium", description: "Yellow lentils tempered with cumin, garlic, and aromatic spices." },
        { name: "Vegetable Curry", category: "Vegan", country: "India", dietType: "Vegan", spiceLevel: "Spicy", description: "Mixed vegetables simmered in a rich coconut curry sauce." },
        { name: "Black Bean Tacos", category: "Vegan", country: "Mexico", dietType: "Vegan", spiceLevel: "Medium", description: "Corn tortillas loaded with seasoned black beans, corn, and avocado." },
        { name: "Vegan Pad Thai", category: "Vegan", country: "Thailand", dietType: "Vegan", spiceLevel: "Medium", description: "Rice noodles with tofu, bean sprouts, peanuts, and lime." },
        { name: "Roasted Cauliflower Steak", category: "Vegan", country: "United Kingdom", dietType: "Vegan", spiceLevel: "Mild", description: "Thick cauliflower slices roasted with herbs and chimichurri sauce." },
        { name: "Vegan Sushi Rolls", category: "Vegan", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Nori-wrapped rice rolls filled with avocado, cucumber, and mango." },
        { name: "Jackfruit Pulled Pork", category: "Vegan", country: "United States", dietType: "Vegan", spiceLevel: "Medium", description: "Shredded jackfruit in smoky BBQ sauce, mimicking pulled pork texture." },
        { name: "Mushroom Bourguignon", category: "Vegan", country: "France", dietType: "Vegan", spiceLevel: "Mild", description: "Hearty French stew with mushrooms, red wine, and root vegetables." },
        { name: "Falafel Bowl", category: "Vegan", country: "Egypt", dietType: "Vegan", spiceLevel: "Medium", description: "Crispy chickpea falafel on rice with hummus, tahini, and pickled veggies." },
        { name: "Injera with Wot", category: "Vegan", country: "Ethiopia", dietType: "Vegan", spiceLevel: "Spicy", description: "Ethiopian sourdough flatbread served with spicy lentil and vegetable stews." },
        { name: "Tempeh Stir Fry", category: "Vegan", country: "Indonesia", dietType: "Vegan", spiceLevel: "Medium", description: "Crispy fermented soybean cakes stir-fried with vegetables and sweet soy." },
        { name: "Baba Ganoush Bowl", category: "Vegan", country: "Lebanon", dietType: "Vegan", spiceLevel: "Mild", description: "Smoky eggplant dip served with rice, fresh vegetables, and warm pita." },
        { name: "Tofu Pad See Ew", category: "Vegan", country: "Thailand", dietType: "Vegan", spiceLevel: "Mild", description: "Wide rice noodles stir-fried with tofu, broccoli, and sweet soy sauce." },
        { name: "Lentil Bolognese", category: "Vegan", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Rich Italian pasta sauce made with lentils, tomatoes, and fresh herbs." },
        { name: "Coconut Curry", category: "Vegan", country: "Sri Lanka", dietType: "Vegan", spiceLevel: "Spicy", description: "Creamy coconut milk curry with chickpeas, sweet potato, and spinach." },
        { name: "Vegan Burger", category: "Vegan", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Plant-based patty served on a bun with fresh lettuce, tomato, and vegan mayo." },
        { name: "Tofu Scramble", category: "Vegan", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Crumbled tofu sautéed with turmeric and veggies as an egg alternative." },
        { name: "Vegan Mac and Cheese", category: "Vegan", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Pasta shells coated in a rich, dairy-free cheese sauce made from cashews or potato." },
        { name: "Stuffed Grape Leaves", category: "Vegan", country: "Middle East", dietType: "Vegan", spiceLevel: "Mild", description: "Vine leaves rolled tightly around a filling of rice, pine nuts, and fresh herbs." },
        { name: "Vegan Chili", category: "Vegan", country: "Mexico", dietType: "Vegan", spiceLevel: "Spicy", description: "Hearty stew of beans, tomatoes, and chili peppers without any animal products." },
        { name: "Mujadara", category: "Vegan", country: "Middle East", dietType: "Vegan", spiceLevel: "Mild", description: "Comforting dish of cooked lentils and rice, garnished with crispy caramelized onions." },
        { name: "Aloo Matar", category: "Vegan", country: "India", dietType: "Vegan", spiceLevel: "Medium", description: "Punjabi dish made from potatoes and peas in a spiced creamy tomato based sauce." },
        { name: "Baingan Bharta", category: "Vegan", country: "India", dietType: "Vegan", spiceLevel: "Medium", description: "Mashed roasted eggplant cooked with onions, tomatoes, and earthy spices." },
        { name: "Vegan Sushi", category: "Vegan", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Vinegared rice rolls filled with cucumber, avocado, inside seaweed." },
        { name: "Miso Glazed Eggplant", category: "Vegan", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Eggplant scored and roasted with a sweet and savory miso paste glaze." },
        { name: "Vegan Pizza", category: "Vegan", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Pizza crust topped with tomato sauce, vegetables, and plant-based cheese." },
        { name: "Vegan Ramen", category: "Vegan", country: "Japan", dietType: "Vegan", spiceLevel: "Medium", description: "Noodle soup featuring a rich umami vegetable broth and satisfying toppings." },
        { name: "Bean Burrito", category: "Vegan", country: "Mexico", dietType: "Vegan", spiceLevel: "Medium", description: "Soft flour tortilla rolled up with refried beans, rice, and salsa." },
        { name: "Tostones", category: "Vegan", country: "Caribbean", dietType: "Vegan", spiceLevel: "Mild", description: "Twice-fried plantain slices, crispy on the outside and starchy within." },
        { name: "Vegetable Spring Rolls", category: "Vegan", country: "China", dietType: "Vegan", spiceLevel: "Mild", description: "Crispy fried wrappers filled with shredded cabbage, carrots, and glass noodles." },

        // DRINKS (35)
        { name: "Matcha Latte", category: "Drinks", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Smooth, earthy Japanese green tea whisked with steamed milk." },
        { name: "Mango Lassi", category: "Drinks", country: "India", dietType: "Vegetarian", spiceLevel: "Mild", description: "Creamy yogurt drink blended with ripe mango and cardamom." },
        { name: "Espresso", category: "Drinks", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Concentrated Italian coffee with a rich crema on top." },
        { name: "Chai Tea", category: "Drinks", country: "India", dietType: "Vegan", spiceLevel: "Mild", description: "Aromatic spiced tea brewed with cinnamon, ginger, and cardamom." },
        { name: "Horchata", category: "Drinks", country: "Mexico", dietType: "Vegan", spiceLevel: "Mild", description: "Sweet rice milk drink flavored with cinnamon and vanilla." },
        { name: "Bubble Tea", category: "Drinks", country: "Taiwan", dietType: "Vegetarian", spiceLevel: "Mild", description: "Sweet milk tea with chewy tapioca pearls — a Taiwanese classic." },
        { name: "Fresh Orange Juice", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Freshly squeezed orange juice bursting with vitamin C." },
        { name: "Turkish Coffee", category: "Drinks", country: "Turkey", dietType: "Vegan", spiceLevel: "Mild", description: "Finely ground coffee brewed in a cezve with a thick, foamy top." },
        { name: "Pina Colada", category: "Drinks", country: "Puerto Rico", dietType: "Vegan", spiceLevel: "Mild", description: "Tropical blend of coconut cream, pineapple juice, and rum." },
        { name: "Lemonade", category: "Drinks", country: "Global", dietType: "Vegan", spiceLevel: "Mild", description: "Refreshing citrus drink made with fresh lemons, sugar, and water." },
        { name: "Smoothie", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Blended fruit drink with banana, berries, and almond milk." },
        { name: "Affogato", category: "Drinks", country: "Italy", dietType: "Vegetarian", spiceLevel: "Mild", description: "A scoop of vanilla gelato drowned in a shot of hot espresso." },
        { name: "Sake", category: "Drinks", country: "Japan", dietType: "Vegan", spiceLevel: "Mild", description: "Traditional Japanese rice wine with a smooth, clean flavor." },
        { name: "Kombucha", category: "Drinks", country: "China", dietType: "Vegan", spiceLevel: "Mild", description: "Slightly fizzy fermented tea drink with probiotic health benefits." },
        { name: "Mojito", category: "Drinks", country: "Cuba", dietType: "Vegan", spiceLevel: "Mild", description: "Refreshing cocktail of rum, fresh mint, lime, sugar, and soda water." },
        { name: "Caipirinha", category: "Drinks", country: "Brazil", dietType: "Vegan", spiceLevel: "Mild", description: "Brazil's national cocktail made with cachaça, lime, and sugar." },
        { name: "Masala Chai", category: "Drinks", country: "India", dietType: "Vegetarian", spiceLevel: "Mild", description: "Rich, spiced Indian tea boiled with milk, ginger, and cardamom." },
        { name: "Sangria", category: "Drinks", country: "Spain", dietType: "Vegan", spiceLevel: "Mild", description: "Spanish punch of red wine, fresh fruit, brandy, and sparkling water." },
        { name: "Vietnamese Coffee", category: "Drinks", country: "Vietnam", dietType: "Vegetarian", spiceLevel: "Mild", description: "Strong dark roast coffee dripped through a phin filter with condensed milk." },
        { name: "Tequila Sunrise", category: "Drinks", country: "Mexico", dietType: "Vegan", spiceLevel: "Mild", description: "Layered cocktail of tequila, orange juice, and grenadine syrup." },
        { name: "Margarita", category: "Drinks", country: "Mexico", dietType: "Vegan", spiceLevel: "Mild", description: "Classic cocktail mixing tequila, orange liqueur, and lime juice." },
        { name: "Pisco Sour", category: "Drinks", country: "Peru", dietType: "Vegetarian", spiceLevel: "Mild", description: "South American classic featuring pisco, citrus juice, syrup, and egg white." },
        { name: "Martini", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Elegant cocktail made with gin and vermouth, garnished with an olive." },
        { name: "Old Fashioned", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Muddled sugar with bitters and water, blended with whiskey, and garnished with citrus rind." },
        { name: "Irish Coffee", category: "Drinks", country: "Ireland", dietType: "Vegetarian", spiceLevel: "Mild", description: "Hot coffee, Irish whiskey, and sugar, stirred, and topped with cream." },
        { name: "Eggnog", category: "Drinks", country: "United Kingdom", dietType: "Vegetarian", spiceLevel: "Mild", description: "Rich, chilled, sweetened, dairy-based beverage traditionally made with milk, cream, sugar, and whipped eggs." },
        { name: "Hot Chocolate", category: "Drinks", country: "Mexico", dietType: "Vegetarian", spiceLevel: "Mild", description: "Heated beverage consisting of shaved chocolate, melted chocolate or cocoa powder." },
        { name: "Mulled Wine", category: "Drinks", country: "Europe", dietType: "Vegan", spiceLevel: "Mild", description: "Beverage usually made with red wine along with various mulling spices and served hot." },
        { name: "Aperol Spritz", category: "Drinks", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Italian wine-based cocktail, commonly served as an apéritif." },
        { name: "Negroni", category: "Drinks", country: "Italy", dietType: "Vegan", spiceLevel: "Mild", description: "Popular Italian cocktail, made of one part gin, one part vermouth rosso, and one part Campari." },
        { name: "Moscow Mule", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Cocktail made with vodka, spicy ginger beer, and lime juice." },
        { name: "Bloody Mary", category: "Drinks", country: "France", dietType: "Vegan", spiceLevel: "Mild", description: "Cocktail containing vodka, tomato juice, and combinations of spices and flavorings." },
        { name: "Cosmopolitan", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice." },
        { name: "Mai Tai", category: "Drinks", country: "United States", dietType: "Vegan", spiceLevel: "Mild", description: "Cocktail based on rum, Curaçao liqueur, orgeat syrup, and lime juice." },
        { name: "Daiquiri", category: "Drinks", country: "Cuba", dietType: "Vegan", spiceLevel: "Mild", description: "Family of cocktails whose main ingredients are rum, citrus juice, and sugar or other sweetener." }
    ];

    // ============ Category Colors ============
    const CAT_COLORS = {
        'Breakfast': { bg: '#f97316', gradient: 'linear-gradient(135deg,#f97316,#ea580c)' },
        'Lunch': { bg: '#22c55e', gradient: 'linear-gradient(135deg,#22c55e,#16a34a)' },
        'Dinner': { bg: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
        'Dessert': { bg: '#ec4899', gradient: 'linear-gradient(135deg,#ec4899,#db2777)' },
        'Snack': { bg: '#eab308', gradient: 'linear-gradient(135deg,#eab308,#ca8a04)' },
        'Fast Food': { bg: '#ef4444', gradient: 'linear-gradient(135deg,#ef4444,#dc2626)' },
        'Healthy Food': { bg: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)' },
        'Vegetarian': { bg: '#14b8a6', gradient: 'linear-gradient(135deg,#14b8a6,#0d9488)' },
        'Vegan': { bg: '#84cc16', gradient: 'linear-gradient(135deg,#84cc16,#65a30d)' },
        'Drinks': { bg: '#06b6d4', gradient: 'linear-gradient(135deg,#06b6d4,#0891b2)' }
    };

    // ============ Combo Meal Labels & Colors ============
    const COMBO_LABELS = {
        'Breakfast': { label: 'Breakfast', color: '#f97316' },
        'Lunch': { label: 'Lunch', color: '#22c55e' },
        'Dinner': { label: 'Dinner', color: '#8b5cf6' },
        'Dessert': { label: 'Dessert', color: '#ec4899' }
    };

    // ============ Wikipedia Name Map ============
    const WIKI_NAME_MAP = {
        'Pancakes': 'Pancake', 'Croissant': 'Croissant', 'Eggs Benedict': 'Eggs_Benedict',
        'French Toast': 'French_toast', 'Oatmeal': 'Oatmeal', 'Waffles': 'Waffle',
        'Bagel with Cream Cheese': 'Bagel', 'Shakshuka': 'Shakshouka', 'Congee': 'Congee',
        'Granola Bowl': 'Granola', 'Breakfast Burrito': 'Breakfast_burrito',
        'Full English Breakfast': 'Full_breakfast', 'Idli': 'Idli',
        'Açaí Bowl': 'Açai_bowl',
        'Caesar Salad': 'Caesar_salad', 'Club Sandwich': 'Club_sandwich',
        'Pho': 'Pho', 'Greek Salad': 'Greek_salad', 'BLT Sandwich': 'BLT',
        'Tom Yum Soup': 'Tom_yum', 'Falafel Wrap': 'Falafel',
        'Minestrone Soup': 'Minestrone', 'Onion Soup': 'French_onion_soup',
        'Quinoa Bowl': 'Buddha_bowl', 'Gyro': 'Gyros', 'Banh Mi': 'Bánh_mì',
        'Ramen': 'Ramen',
        'Spaghetti Bolognese': 'Bolognese_sauce', 'Sushi': 'Sushi',
        'Chicken Tikka Masala': 'Chicken_tikka_masala', 'Steak': 'Beefsteak',
        'Paella': 'Paella', 'Pad Thai': 'Pad_thai', 'Lasagna': 'Lasagna',
        'Chili con Carne': 'Chili_con_carne', 'Roast Chicken': 'Roast_chicken',
        'Butter Chicken': 'Butter_chicken',
        'Biryani': 'Biryani', 'Fish and Chips': 'Fish_and_chips', 'Tacos': 'Taco',
        'Peking Duck': 'Peking_duck', 'Lamb Chops': 'Loin_chop',
        'Coq au Vin': 'Coq_au_vin', 'Jollof Rice': 'Jollof_rice', 'Rendang': 'Rendang',
        'Tiramisu': 'Tiramisu', 'Chocolate Cake': 'Chocolate_cake',
        'Crème Brûlée': 'Crème_brûlée', 'Mochi': 'Mochi', 'Baklava': 'Baklava',
        'Churros': 'Churro', 'Gelato': 'Gelato', 'Panna Cotta': 'Panna_cotta',
        'Gulab Jamun': 'Gulab_jamun', 'Crêpes': 'Crêpe', 'Cheesecake': 'Cheesecake',
        'Mango Sticky Rice': 'Mango_sticky_rice', 'Cannoli': 'Cannoli',
        'Brigadeiro': 'Brigadeiro',
        'Nachos': 'Nachos', 'Spring Rolls': 'Spring_roll', 'Samosa': 'Samosa',
        'Hummus with Pita': 'Hummus', 'Onion Rings': 'Onion_ring',
        'Edamame': 'Edamame', 'Bruschetta': 'Bruschetta', 'Empanada': 'Empanada',
        'Pretzels': 'Pretzel', 'Trail Mix': 'Trail_mix',
        'Pão de Queijo': 'Pão_de_queijo', 'Dim Sum': 'Dim_sum',
        'Cheeseburger': 'Cheeseburger', 'Pizza': 'Pizza', 'Hot Dog': 'Hot_dog',
        'Fried Chicken': 'Fried_chicken', 'French Fries': 'French_fries',
        'Kebab': 'Kebab', 'Chicken Nuggets': 'Chicken_nugget',
        'Fish Tacos': 'Taco', 'Shawarma': 'Shawarma', 'Corn Dog': 'Corn_dog',
        'Doner Kebab': 'Doner_kebab', 'Avocado Toast': 'Avocado_toast',
        'Grilled Salmon': 'Salmon_as_food', 'Buddha Bowl': 'Buddha_bowl',
        'Chicken Breast Salad': 'Chicken_salad', 'Smoothie Bowl': 'Smoothie',
        'Steamed Vegetables': 'Steaming', 'Lentil Soup': 'Lentil_soup',
        'Grilled Chicken Wrap': 'Wrap_(food)', 'Overnight Oats': 'Oatmeal',
        'Margherita Pizza': 'Pizza_Margherita', 'Caprese Salad': 'Caprese_salad',
        'Mushroom Risotto': 'Risotto', 'Paneer Tikka': 'Paneer_tikka',
        'Vegetable Stir Fry': 'Stir_frying', 'Eggplant Parmesan': 'Parmigiana',
        'Spinach & Ricotta Ravioli': 'Ravioli', 'Chana Masala': 'Chana_masala',
        'Cheese Quesadilla': 'Quesadilla', 'Palak Paneer': 'Palak_paneer',
        'Vegan Buddha Bowl': 'Buddha_bowl', 'Dal Tadka': 'Dal', 'Vegetable Curry': 'Curry',
        'Black Bean Tacos': 'Taco', 'Vegan Pad Thai': 'Pad_thai',
        'Roasted Cauliflower Steak': 'Cauliflower', 'Vegan Sushi Rolls': 'Sushi',
        'Jackfruit Pulled Pork': 'Pulled_pork', 'Mushroom Bourguignon': 'Beef_bourguignon',
        'Matcha Latte': 'Matcha', 'Mango Lassi': 'Lassi',
        'Espresso': 'Espresso', 'Chai Tea': 'Masala_chai', 'Horchata': 'Horchata',
        'Bubble Tea': 'Bubble_tea', 'Fresh Orange Juice': 'Orange_juice',
        'Turkish Coffee': 'Turkish_coffee', 'Pina Colada': 'Piña_colada',
        'Lemonade': 'Lemonade', 'Smoothie': 'Smoothie', 'Affogato': 'Affogato',
        'Dosa': 'Masala_dosa', 'Chilaquiles': 'Chilaquiles', 'Medovik': 'Medovik',
        'Nasi Goreng': 'Nasi_goreng',
        'Ceviche': 'Ceviche', 'Bibimbap': 'Bibimbap', 'Gazpacho': 'Gazpacho',
        'Arepas': 'Arepa', 'Osso Buco': 'Ossobuco',
        'Cacio e Pepe': 'Cacio_e_pepe', 'Bulgogi': 'Bulgogi',
        'Tagine': 'Tagine', 'Pierogi': 'Pierogi',
        'Pavlova': 'Pavlova', 'Tarte Tatin': 'Tarte_Tatin',
        'Tres Leches Cake': 'Tres_leches_cake', 'Rasgulla': 'Rasgulla',
        'Arancini': 'Arancini', 'Takoyaki': 'Takoyaki',
        'Pakora': 'Pakora', 'Churro Bites': 'Churro',
        'Poutine': 'Poutine', 'Currywurst': 'Currywurst',
        'Bao Buns': 'Baozi', 'Tabbouleh': 'Tabbouleh',
        'Poke Bowl': 'Poke_(dish)',
        'Aloo Gobi': 'Aloo_gobhi', 'Spanakopita': 'Savory_spinach_pie',
        'Ratatouille': 'Ratatouille',
        'Falafel Bowl': 'Falafel', 'Injera with Wot': 'Injera',
        'Tempeh Stir Fry': 'Tempeh',
        'Sake': 'Sake', 'Kombucha': 'Kombucha',
        'Mojito': 'Mojito', 'Caipirinha': 'Caipirinha',
        'Khachapuri': 'Khachapuri', 'Menemen': 'Menemen_(food)',
        'Porridge': 'Porridge', 'Huevos Rancheros': 'Huevos_rancheros',
        'Laksa': 'Laksa', 'Souvlaki': 'Souvlaki',
        'Tortilla Española': 'Spanish_omelette', 'Borscht': 'Borscht',
        'Chicken Adobo': 'Philippine_adobo', 'Sauerbraten': 'Sauerbraten',
        'Massaman Curry': 'Massaman_curry', 'Mole Poblano': 'Mole_(sauce)',
        'Profiterole': 'Profiterole', 'Alfajores': 'Alfajor',
        'Kunafa': 'Knafeh', 'Dorayaki': 'Dorayaki',
        'Gimbap': 'Gimbap', 'Croquetas': 'Croquette',
        'Lumpia': 'Lumpia', 'Baba Ganoush': 'Baba_ghanoush',
        'Jerk Chicken': 'Jerk_(cooking)', 'Pupusa': 'Pupusa',
        'Satay': 'Satay',
        'Miso Soup': 'Miso_soup', 'Fattoush': 'Fattoush',
        'Gnocchi': 'Gnocchi', 'Saag Paneer': 'Saag',
        'Shakshuka Green': 'Shakshouka',
        'Baba Ganoush Bowl': 'Baba_ghanoush',
        'Tofu Pad See Ew': 'Pad_see_ew',
        'Lentil Bolognese': 'Bolognese_sauce',
        'Coconut Curry': 'Curry',
        'Masala Chai': 'Masala_chai', 'Sangria': 'Sangria',
        'Vietnamese Coffee': 'Vietnamese_iced_coffee',
        'Tequila Sunrise': 'Tequila_sunrise',
        'Kaya Toast': 'Kaya_toast', 'Gallo Pinto': 'Gallo_pinto', 'Appam': 'Appam',
        'Msemen': 'Msemmen', 'Cachapa': 'Cachapa', 'Ackee and Saltfish': 'Ackee_and_saltfish',
        'Pain au Chocolat': 'Pain_au_chocolat', 'Rösti': 'Rösti', 'Syrniki': 'Syrniki',
        'Tamales': 'Tamale', 'Jianbing': 'Jianbing', 'Scotch Egg': 'Scotch_egg',
        'Mangú': 'Mangú', 'Poha': 'Flattened_rice', 'Loco Moco': 'Loco_moco',
        'Bento': 'Bento', 'Niçoise Salad': 'Salade_niçoise', 'Panini': 'Panini_(sandwich)',
        'Gumbo': 'Gumbo', 'Jambalaya': 'Jambalaya', 'Clam Chowder': 'Clam_chowder',
        'Muffuletta': 'Muffuletta', 'Cobb Salad': 'Cobb_salad', 'Lobster Roll': 'Lobster_roll',
        'Croque Monsieur': 'Croque_monsieur', 'Pita Bread': 'Pita', 'Salmorejo': 'Salmorejo',
        'Welsh Rarebit': 'Welsh_rarebit', 'Koshari': 'Koshary', 'Torta': 'Torta',
        'Beef Wellington': 'Beef_Wellington', 'Bratwurst': 'Bratwurst', 'Feijoada': 'Feijoada',
        'Cassoulet': 'Cassoulet', 'Bouillabaisse': 'Bouillabaisse', 'Plov': 'Pilaf',
        'Hainanese Chicken Rice': 'Hainanese_chicken_rice', 'Pad Kra Pao': 'Phat_kaphrao',
        'Pastitsio': 'Pastitsio', 'Raclette': 'Raclette',
        'Fondue': 'Fondue', 'Shabu-shabu': 'Shabu-shabu', 'Carnitas': 'Carnitas',
        'Wiener Schnitzel': 'Wiener_schnitzel', 'Éclair': 'Éclair', 'Macaron': 'Macaron',
        'Flan': 'Crème_caramel', 'Sticky Toffee Pudding': 'Sticky_toffee_pudding',
        'Black Forest Gâteau': 'Black_Forest_gateau', 'Banoffee Pie': 'Banoffee_pie',
        'Victoria Sponge': 'Sponge_cake', 'Red Velvet Cake': 'Red_velvet_cake',
        'Key Lime Pie': 'Key_lime_pie', 'Apple Pie': 'Apple_pie', 'Pecan Pie': 'Pecan_pie',
        'Bingsu': 'Bingsu', 'Tanghulu': 'Tanghulu', 'Loukoumades': 'Lokma',
        'Qatayef': 'Qatayef', 'Pork Rinds': 'Pork_rind', 'Beef Jerky': 'Jerky',
        'Popcorn': 'Popcorn', 'Potato Chips': 'Potato_chips', 'Tortilla Chips': 'Tortilla_chips',
        'Plantain Chips': 'Banana_chips', 'Calçots': 'Calçot', 'Pigs in a Blanket': 'Pigs_in_a_blanket',
        'Cheese Board': 'Cheese', 'Olives': 'Olive', 'Roasted Chestnuts': 'Roasted_chestnut',
        'Prawn Crackers': 'Prawn_cracker', 'Pandebono': 'Pandebono', 'Bhujia': 'Bikaneri_bhujia',
        'Gordita': 'Gordita', 'Chili Dog': 'Chili_dog', 'Submarine Sandwich': 'Submarine_sandwich',
        'Fried Rice': 'Fried_rice', 'Lo Mein': 'Lo_mein', 'Buffalo Wings': 'Buffalo_wing',
        'Dürüm': 'Dürüm', 'Taquito': 'Taquito', 'Burrito': 'Burrito',
        'Chimichanga': 'Chimichanga', 'Macaroni and Cheese': 'Macaroni_and_cheese',
        'Sloppy Joe': 'Sloppy_joe', 'Tater Tots': 'Tater_tots', 'Mozzarella Sticks': 'Mozzarella_sticks',
        'Patatas Bravas': 'Patatas_bravas', 'Fish Cake': 'Fishcake', 'Quinoa Salad': 'Quinoa',
        'Edamame Beans': 'Edamame', 'Kale Salad': 'Kale',
        'Roasted Chickpeas': 'Chickpea', 'Farro Salad': 'Farro', 'Baked Sweet Potato': 'Sweet_potato',
        'Stuffed Bell Peppers': 'Stuffed_peppers', 'Zucchini Noodles': 'Zucchini',
        'Greek Yogurt with Honey': 'Strained_yogurt', 'Spaghetti Squash': 'Spaghetti_squash',
        'Seaweed Salad': 'Edible_seaweed', 'Caponata': 'Caponata', 'Mac and Cheese': 'Macaroni_and_cheese',
        'Eggplant Parmigiana': 'Parmigiana', 'Aloo Tikki': 'Aloo_tikki', 'Malai Kofta': 'Kofta',
        'Vegetable Samosa': 'Samosa', 'Tiropita': 'Tiropita', 'Caprese Sandwich': 'Caprese_salad',
        'Stuffed Shells': 'Conchiglie', 'Vegetable Tian': 'Tian_(dish)',
        'Quattro Formaggi Pizza': 'Pizza_quattro_formaggi', 'Mushroom Wellington': 'Beef_Wellington',
        'Truffle Risotto': 'Risotto', 'Halloumi Cheese': 'Halloumi', 'Gougères': 'Gougère',
        'Focaccia': 'Focaccia', 'Vegan Burger': 'Veggie_burger', 'Tofu Scramble': 'Scrambled_eggs',
        'Vegan Mac and Cheese': 'Macaroni_and_cheese', 'Stuffed Grape Leaves': 'Dolma',
        'Vegan Chili': 'Chili_con_carne', 'Mujadara': 'Mujaddara', 'Aloo Matar': 'Aloo_mutter',
        'Baingan Bharta': 'Baingan_bharta', 'Vegan Sushi': 'Sushi', 'Miso Glazed Eggplant': 'Eggplant_(color)',
        'Vegan Pizza': 'Pizza', 'Vegan Ramen': 'Ramen', 'Bean Burrito': 'Burrito',
        'Tostones': 'Tostones', 'Vegetable Spring Rolls': 'Spring_roll', 'Margarita': 'Margarita',
        'Pisco Sour': 'Pisco_sour', 'Martini': 'Martini_(cocktail)', 'Old Fashioned': 'Old_fashioned_(cocktail)',
        'Irish Coffee': 'Irish_coffee', 'Eggnog': 'Eggnog', 'Hot Chocolate': 'Hot_chocolate',
        'Mulled Wine': 'Mulled_wine', 'Aperol Spritz': 'Spritz_(cocktail)',
        'Negroni': 'Negroni', 'Moscow Mule': 'Moscow_mule', 'Bloody Mary': 'Bloody_Mary_(cocktail)',
        'Cosmopolitan': 'Cosmopolitan_(cocktail)', 'Mai Tai': 'Mai_Tai', 'Daiquiri': 'Daiquiri',
        'Muesli': 'Muesli', 'Kimchi': 'Kimchi', 'Sauerkraut': 'Braised_sauerkraut',
        'Kefir': 'Kefir', 'Guacamole': 'Guacamole', 'Tzatziki': 'Tzatziki',
        'Nattō': 'Nattō', 'Kombu': 'Kombu', 'Goji Berries': 'Goji',
        'Soba Noodles': 'Soba', 'Watermelon Salad': 'Watermelon',
        'Shirazi Salad': 'Shirazi_salad', 'Som Tum': 'Green_papaya_salad'
    };

    // ============ State ============
    let currentResults = [];
    let favorites = JSON.parse(localStorage.getItem('rfg-favorites') || '[]');
    const imageCache = {};

    // ============ DOM References ============
    const $ = id => document.getElementById(id);
    const qtyInput = $('qty-input');
    const categorySelect = $('category-select');
    const dietSelect = $('diet-select');
    const spiceSelect = $('spice-select');
    const generateBtn = $('generate-btn');
    const comboBtn = $('combo-btn');
    const surpriseBtn = $('surprise-btn');
    const copyBtn = $('copy-btn');
    const clearBtn = $('clear-btn');
    const resultGrid = $('result-grid');
    const emptyState = $('empty-state');
    const resultCount = $('result-count');
    const loadingSpinner = $('loading-spinner');

    // Favorites
    const favoritesToggle = $('favorites-toggle');
    const favoritesContent = $('favorites-content');
    const favoritesGrid = $('favorites-grid');
    const favoritesEmpty = $('favorites-empty');
    const favoritesCount = $('favorites-count');
    const clearFavoritesBtn = $('clear-favorites-btn');

    // ============ Collapsible Panels ============
    function initPanels() {
        [
            { toggle: favoritesToggle, content: favoritesContent }
        ].forEach(({ toggle, content }) => {
            if (!toggle || !content) return;
            toggle.addEventListener('click', () => {
                const arrow = toggle.querySelector('.panel-toggle');
                content.classList.toggle('open');
                arrow && arrow.classList.toggle('open');
            });
        });
    }

    // ============ Filter Engine ============
    function getFilteredFoods() {
        const cat = categorySelect ? categorySelect.value : 'All';
        const diet = dietSelect ? dietSelect.value : 'Any';
        const spice = spiceSelect ? spiceSelect.value : 'Any';

        return FOODS.filter(f => {
            if (cat !== 'All' && f.category !== cat) return false;
            if (diet !== 'Any') {
                if (diet === 'Vegetarian' && f.dietType !== 'Vegetarian' && f.dietType !== 'Vegan') return false;
                if (diet === 'Vegan' && f.dietType !== 'Vegan') return false;
                if (diet === 'Gluten Free' && f.dietType !== 'Gluten Free') return false;
            }
            if (spice !== 'Any' && f.spiceLevel !== spice) return false;
            return true;
        });
    }

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ============ Generate Random Food ============
    function generateRandomFood() {
        const qty = Math.min(Math.max(parseInt(qtyInput?.value) || 3, 1), 12);
        const pool = getFilteredFoods();

        if (pool.length === 0) {
            showToast('No foods match your filters! Try adjusting them.', 'warning');
            return;
        }

        const shuffled = shuffle(pool);
        currentResults = shuffled.slice(0, Math.min(qty, pool.length));

        showLoadingThenRender();
        showToast(`Generated ${currentResults.length} food${currentResults.length > 1 ? 's' : ''}!`);
    }

    // ============ Generate Meal Combo ============
    function generateMealCombo() {
        const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
        const combo = [];

        for (const cat of categories) {
            const pool = FOODS.filter(f => f.category === cat);
            if (pool.length > 0) {
                combo.push(pool[Math.floor(Math.random() * pool.length)]);
            }
        }

        if (combo.length === 0) {
            showToast('Could not generate a combo!', 'warning');
            return;
        }

        currentResults = combo;
        showLoadingThenRender(true);
        showToast('🍽️ Meal combo generated!');
    }

    // ============ Surprise Me ============
    function surpriseFood() {
        const pool = FOODS;
        const food = pool[Math.floor(Math.random() * pool.length)];
        currentResults = [food];

        showLoadingThenRender();
        showToast(`🎉 Surprise! ${food.name}!`);
    }

    // ============ Loading Animation ============
    function showLoadingThenRender(isCombo = false) {
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        if (resultGrid) resultGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'none';

        setTimeout(() => {
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            renderResults(isCombo);
        }, 350);
    }

    // ============ Render Results ============
    function renderResults(isCombo = false) {
        if (!resultGrid) return;
        resultGrid.innerHTML = '';
        emptyState && (emptyState.style.display = currentResults.length ? 'none' : 'flex');
        resultCount && (resultCount.textContent = currentResults.length);

        currentResults.forEach((food, i) => {
            const card = document.createElement('div');
            card.className = 'food-card card-pop';
            card.style.animationDelay = `${i * 0.08}s`;
            const colors = CAT_COLORS[food.category] || { bg: '#64748b', gradient: 'linear-gradient(135deg,#64748b,#475569)' };
            const isFav = favorites.some(f => f.name === food.name);

            let comboLabelHTML = '';
            if (isCombo && COMBO_LABELS[food.category]) {
                const cl = COMBO_LABELS[food.category];
                comboLabelHTML = `<span class="combo-label" style="background:${cl.color}">${cl.label}</span>`;
            }

            card.innerHTML = `
                ${comboLabelHTML}
                <button class="fav-btn ${isFav ? 'active' : ''}" data-food="${encodeURIComponent(JSON.stringify(food))}" 
                    aria-label="${isFav ? 'Remove from' : 'Add to'} favorites" title="${isFav ? 'Remove from' : 'Save to'} favorites">
                    ${isFav ? '💖' : '💚'}
                </button>
                <div class="food-card-inner">
                    <div class="food-img-wrap loading" id="img-wrap-${i}">
                        <svg class="img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
                    </div>
                    <div class="food-name">${food.name}</div>
                    <span class="category-badge" style="background:${colors.gradient};color:#fff">${food.category}</span>
                    <div class="food-details">
                        <div class="detail-row"><span class="detail-icon">🌍</span><span class="detail-text">${food.country}</span></div>
                        <div class="detail-row"><span class="detail-icon">${getDietIcon(food.dietType)}</span><span class="detail-text">${food.dietType}</span></div>
                        <div class="detail-row"><span class="detail-icon">${getSpiceIcon(food.spiceLevel)}</span><span class="detail-text">${food.spiceLevel}</span></div>
                    </div>
                    <p class="food-description">${food.description}</p>
                </div>`;

            // Favorite button handler
            const favBtn = card.querySelector('.fav-btn');
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(food, favBtn);
            });

            resultGrid.appendChild(card);
        });

        // Fetch all images in a single batch API call
        fetchFoodImagesBatch(currentResults);
    }

    function getDietIcon(diet) {
        const icons = { 'Any': '🍽️', 'Vegetarian': '🥕', 'Vegan': '🌱', 'Gluten Free': '🚫' };
        return icons[diet] || '🍽️';
    }

    function getSpiceIcon(spice) {
        const icons = { 'Mild': '😊', 'Medium': '🌶️', 'Spicy': '🔥' };
        return icons[spice] || '😊';
    }

    // ============ Wikipedia Image Fetcher (Batch API) ============
    function fetchFoodImagesBatch(foods) {
        const uncached = [];
        foods.forEach((food, i) => {
            if (imageCache[food.name]) {
                const wrap = $(`img-wrap-${i}`);
                if (wrap) applyImage(wrap, imageCache[food.name]);
            } else {
                uncached.push({ food, index: i });
            }
        });

        if (uncached.length === 0) return;

        const titles = uncached.map(u => WIKI_NAME_MAP[u.food.name] || u.food.name.replace(/ /g, '_'));
        const titlesStr = titles.join('|');

        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesStr)}&prop=pageimages&format=json&pithumbsize=400&origin=*`;

        fetch(url)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
                const pages = data.query?.pages || {};
                const titleToImg = {};
                Object.values(pages).forEach(page => {
                    if (page.thumbnail?.source) {
                        titleToImg[page.title.replace(/ /g, '_')] = page.thumbnail.source;
                    }
                });

                const normalized = {};
                (data.query?.normalized || []).forEach(n => {
                    normalized[n.from] = n.to.replace(/ /g, '_');
                });
                const redirects = {};
                (data.query?.redirects || []).forEach(r => {
                    redirects[r.from.replace(/ /g, '_')] = r.to.replace(/ /g, '_');
                });

                uncached.forEach((u, idx) => {
                    const wrap = $(`img-wrap-${u.index}`);
                    if (!wrap) return;

                    const queryTitle = titles[idx];
                    let imgUrl = titleToImg[queryTitle];
                    if (!imgUrl && normalized[queryTitle]) imgUrl = titleToImg[normalized[queryTitle]];
                    if (!imgUrl && redirects[queryTitle]) imgUrl = titleToImg[redirects[queryTitle]];

                    if (imgUrl) {
                        imageCache[u.food.name] = imgUrl;
                        applyImage(wrap, imgUrl);
                    } else {
                        wrap.classList.remove('loading');
                    }
                });
            })
            .catch(() => {
                uncached.forEach(u => {
                    const wrap = $(`img-wrap-${u.index}`);
                    if (wrap) wrap.classList.remove('loading');
                });
            });
    }

    function applyImage(wrap, imgSrc) {
        const img = document.createElement('img');
        img.alt = '';
        img.style.opacity = '0';
        img.src = imgSrc;
        wrap.appendChild(img);
        img.onload = () => {
            wrap.classList.remove('loading');
            const placeholder = wrap.querySelector('.img-placeholder');
            if (placeholder) placeholder.remove();
            img.style.opacity = '1';
        };
        img.onerror = () => {
            wrap.classList.remove('loading');
            img.remove();
        };
    }

    // ============ Favorites System ============
    function toggleFavorite(food, btn) {
        const idx = favorites.findIndex(f => f.name === food.name);
        if (idx > -1) {
            favorites.splice(idx, 1);
            btn.classList.remove('active');
            btn.innerHTML = '💚';
            btn.setAttribute('aria-label', 'Add to favorites');
            btn.setAttribute('title', 'Save to favorites');
            showToast(`Removed ${food.name} from favorites`);
        } else {
            favorites.push(food);
            btn.classList.add('active');
            btn.innerHTML = '💖';
            btn.setAttribute('aria-label', 'Remove from favorites');
            btn.setAttribute('title', 'Remove from favorites');
            showToast(`💖 ${food.name} saved to favorites!`);
        }
        localStorage.setItem('rfg-favorites', JSON.stringify(favorites));
        renderFavorites();
    }

    function renderFavorites() {
        if (!favoritesGrid) return;
        favoritesGrid.innerHTML = '';
        favoritesCount && (favoritesCount.textContent = `(${favorites.length})`);
        favoritesEmpty && (favoritesEmpty.style.display = favorites.length ? 'none' : 'block');

        favorites.forEach((food, i) => {
            const card = document.createElement('div');
            card.className = 'fav-card animate-fade-in';
            card.innerHTML = `
                <div class="fav-emoji" id="fav-img-wrap-${i}"></div>
                <div class="fav-info">
                    <div class="fav-name">${food.name}</div>
                    <div class="fav-cat">${food.category} · ${food.country}</div>
                </div>
                <button class="fav-remove" aria-label="Remove ${food.name} from favorites" title="Remove">✕</button>`;

            card.querySelector('.fav-remove').addEventListener('click', () => {
                favorites = favorites.filter(f => f.name !== food.name);
                localStorage.setItem('rfg-favorites', JSON.stringify(favorites));
                renderFavorites();
                // Update card buttons if result is still showing
                document.querySelectorAll('.fav-btn').forEach(btn => {
                    try {
                        const btnFood = JSON.parse(decodeURIComponent(btn.dataset.food));
                        if (btnFood.name === food.name) {
                            btn.classList.remove('active');
                            btn.innerHTML = '💚';
                        }
                    } catch (e) { }
                });
                showToast(`Removed ${food.name} from favorites`);
            });

            favoritesGrid.appendChild(card);
        });

        // Fetch images for favorite cards
        if (favorites.length > 0) {
            const titles = favorites.map(f => WIKI_NAME_MAP[f.name] || f.name.replace(/ /g, '_'));
            const titlesStr = titles.join('|');
            const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesStr)}&prop=pageimages&format=json&pithumbsize=80&origin=*`;
            fetch(url)
                .then(res => res.ok ? res.json() : Promise.reject())
                .then(data => {
                    const pages = data.query?.pages || {};
                    const titleToImg = {};
                    Object.values(pages).forEach(page => {
                        if (page.thumbnail?.source) titleToImg[page.title.replace(/ /g, '_')] = page.thumbnail.source;
                    });
                    const normalized = {};
                    (data.query?.normalized || []).forEach(n => { normalized[n.from] = n.to.replace(/ /g, '_'); });
                    const redirects = {};
                    (data.query?.redirects || []).forEach(r => { redirects[r.from.replace(/ /g, '_')] = r.to.replace(/ /g, '_'); });

                    favorites.forEach((food, idx) => {
                        const wrap = $(`fav-img-wrap-${idx}`);
                        if (!wrap) return;
                        const queryTitle = titles[idx];
                        let imgUrl = titleToImg[queryTitle];
                        if (!imgUrl && normalized[queryTitle]) imgUrl = titleToImg[normalized[queryTitle]];
                        if (!imgUrl && redirects[queryTitle]) imgUrl = titleToImg[redirects[queryTitle]];
                        if (imgUrl) {
                            const img = document.createElement('img');
                            img.src = imgUrl;
                            img.alt = food.name;
                            img.style.cssText = 'width:2.5rem;height:2.5rem;object-fit:cover;border-radius:0.5rem;';
                            wrap.appendChild(img);
                        }
                    });
                }).catch(() => { });
        }
    }



    function clearFavorites() {
        favorites = [];
        localStorage.removeItem('rfg-favorites');
        renderFavorites();
        // Update card buttons
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.innerHTML = '💚';
        });
        showToast('Favorites cleared!');
    }

    // ============ Clipboard ============
    function copyResults() {
        if (!currentResults.length) { showToast('Nothing to copy!', 'warning'); return; }
        const text = currentResults.map((f, i) =>
            `${i + 1}. ${f.name} (${f.category})\n   Country: ${f.country}\n   Diet: ${f.dietType}\n   Spice: ${f.spiceLevel}\n   ${f.description}`
        ).join('\n\n');
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
            copyBtn?.classList.add('copy-success');
            setTimeout(() => copyBtn?.classList.remove('copy-success'), 600);
        }).catch(() => showToast('Failed to copy!', 'error'));
    }

    // ============ Clear ============
    function clearResults() {
        currentResults = [];
        if (resultGrid) resultGrid.innerHTML = '';
        emptyState && (emptyState.style.display = 'flex');
        resultCount && (resultCount.textContent = '0');
    }

    // ============ Toast ============
    function showToast(msg, type) {
        const toast = $('toast');
        const tmsg = $('toast-message');
        if (!toast || !tmsg) return;
        tmsg.textContent = msg;
        const icon = toast.querySelector('svg');
        if (icon) {
            if (type === 'warning') icon.style.color = '#f59e0b';
            else if (type === 'error') icon.style.color = '#ef4444';
            else icon.style.color = '#10b981';
        }
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ============ Keyboard Shortcuts ============
    function initKeyboard() {
        document.addEventListener('keydown', e => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
            if (e.key === 'Enter') { e.preventDefault(); generateRandomFood(); }
            if (e.key === ' ') { e.preventDefault(); surpriseFood(); }
            if (e.key === 'Escape') { e.preventDefault(); clearResults(); }
        });
    }

    // ============ Init ============
    function init() {
        initPanels();
        initKeyboard();

        generateBtn?.addEventListener('click', generateRandomFood);
        comboBtn?.addEventListener('click', generateMealCombo);
        surpriseBtn?.addEventListener('click', surpriseFood);
        copyBtn?.addEventListener('click', copyResults);
        clearBtn?.addEventListener('click', clearResults);
        clearFavoritesBtn?.addEventListener('click', clearFavorites);

        // Show total count
        const totalEl = $('total-foods');
        if (totalEl) totalEl.textContent = FOODS.length;

        // Render persisted data
        renderFavorites();
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();

})();
