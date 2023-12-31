'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.BIGINT(2),
        primaryKey: true,
        autoIncrement: true
      },
      image: {
        type: Sequelize.TEXT
      },
      brand: {
        type: Sequelize.STRING(100)
      },
      price: {
        type: Sequelize.DECIMAL(14, 2)
      },
      rating: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true
      },
      numReviews: {
        type: Sequelize.BIGINT(7),
        allowNull: true
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
      },
      name: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.BIGINT(2),
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reviews: {
        type: Sequelize.JSON
      },
      countInStock: {
        type: Sequelize.BIGINT(7)
      },
      richDescription: {
        type: Sequelize.TEXT
      },
      images: {
        type: Sequelize.JSON
      }
    }, {
      engine: 'InnoDB',
      charset: 'utf8'
    });
    const productsData = [
      {
        image: "http://localhost:3000/public/uploads/Surface-Pro-7-128GB-1604665289664.png",
        brand: "ASUS",
        price: 250,
        rating: null,
        numReviews: null,
        isFeatured: false,
        name: "Surface Pro 7 128GB",
        description: "Tablet PC - Intel Core i3 1005G1 Ice Lake, touchscreen 12.3\" IPS 2736 × 1824, RAM 4GB LPDDR4X, Intel UHD Graphics",
        category: 3,
        reviews: JSON.stringify([
          {
            avatar: "https://pbs.twimg.com/profile_images/1760228143/Vetor-Johnny-Bravo-Vetorizado-Corel_400x400.jpg",
            name: "Johnny Bravo",
            review: "Amazing experience all around"
          },
          {
            avatar: "https://vignette.wikia.nocookie.net/asterix/images/3/3c/Asterix.png",
            name: "Asterix",
            review: "It's very hard. Only managed with resource to magic potion"
          },
          {
            avatar: "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Coyote.gif",
            name: "Wild Coyote",
            review: "All my trickery and tools paid of. Thank ACME for suggesting this product to me"
          }
        ]),
        countInStock: 8,
        richDescription: "<p>The small, versatile Microsoft Surface tablet pc features a detachable keyboard and offers the comfort of a classic laptop as well as the convenience of a tablet.&nbsp;<strong>Its all-metal body ensures exceptional durability&nbsp;and features a strikingly precise build quality.&nbsp;</strong>The Surface Pro 7 128GB i3 4GB platinum + EN/US Keyboard Included boasts smartly configured parameters that make it ideal for undemanding users and for ordinary work tasks, while its compact dimensions are great for frequent travelling. The device incorporates a very fast and energy-efficient dual-core&nbsp;<strong>Intel Core i3&nbsp;processor</strong>. For your files there is SSD that speeds up the entire system. The computer comes with a preinstalled Windows 10 Home operating system.</p><p><br></p><h2>Key Features of the <span style=\"color: rgb(230, 0, 0);\">12.3</span>\" Surface Pro 7 128GB i3 4GB platinum + EN/US Keyboard Included Mini PC Tablet</h2><ul><li>You can separate the display and leave the keyboard at home</li><li>Exceptional build quality with all-metal construction</li><li><strong>Microsoft Surface&nbsp;hybrid tablet features a&nbsp;12.3\"&nbsp;touchscreen display</strong></li><li>IPS panel technology with 2736 × 1824px resolution</li><li>Intel Core i3 1005G1 Ice Lake processor</li><li>The hybrid's camera supports Windows Hello facial recognition for easy log in</li><li>Surface Pro 7 128GB i3 4GB platinum + EN/US Keyboard Included Tablet PC is powered by Windows 10 Home</li><li>The integrated battery lasts up to 10,5 hr(s)</li><li>Tablet PC weight: 0.78kg</li><li>Microsoft dimensions: 292 × 8.5 × 201mm</li></ul>",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f15d8852a025143f9593a7c-1604665316399.png",
          "http://localhost:3000/public/uploads/5f15d8852a025143f9593a7c-1604665316400.jpeg"
        ])
      },{
        image: "http://localhost:3000/public/uploads/TESCOMA-ULTIMA-7.5l-Pressure-cooker-1604699047217.png",
        brand: "TESCOMA",
        price: 490.9,
        rating: 3.5,
        numReviews: null,
        isFeatured: true,
        name: "TESCOMA ULTIMA 7.5l Pressure cooker",
        description: "Pressure Cooker - with a volume of 7,5l, lock with one hand, 2 valves, made of stainless steel, dishwasher safe and steam basket\n",
        category: 4,
        reviews: JSON.stringify([
          {
            "avatar": "https://pbs.twimg.com/profile_images/1760228143/Vetor-Johnny-Bravo-Vetorizado-Corel_400x400.jpg",
            "name": "Johnny Bravo",
            "review": "Amazing experience all around"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/asterix/images/3/3c/Asterix.png",
            "name": "Asterix",
            "review": "It's very hard. Only managed with resource to magic potion"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Coyote.gif",
            "name": "Wild Coyote",
            "review": "All my trickery and tools paid of. Thank ACME for suggesting this product to me"
          }
        ]),
        countInStock: 5,
        richDescription: "<h2>TESCOMA ULTIMA 7.5l Pressure cooker</h2><p>If you do not own a pressure cooker, it’s time to consider buying one. Cooking in a pressure cooker is healthier, faster, and therefore more economical. Traditional Czech manufacturer TESCOMA offers you a great choice in first-class stainless steel. The 7.5l ULTIMA pressure cooker is equipped with a unique IDEALCOOK fast working pressure adjustment system. This technology will allow you to use the pot correctly and easily for fast and gentle cooking. Thanks to the graphic symbols on the pressure regulator, you can easily set the ideal pressure for the type of food you want. The risk of spoilage is minimal. The ULTIMA pressure cooker is easy to close and open with just one hand.</p><p><br></p><h2>Key Features of the ULTIMA Pressure Cooker</h2><ul><li>Made of high-grade steel and highly durable plastic</li><li>Large swivel closure for easy opening and closing with one hand</li><li>The ability to set different pressure levels in the pot</li><li>Simple, intuitive pressure settings according to graphic symbols (IDEALCOOK)</li><li>Equipped with a pot pressure indicator</li><li>4 safety fuses</li><li>Massive plastic fasteners</li><li>Cup cooker with scale</li><li>Three-layer sandwich bottom for perfect heat distribution</li><li>Supplied with a stainless-steel sieve</li><li>Suitable for all types of hobs. including induction cookers</li><li>The pot is dishwasher-safe, but not the lid</li><li>Awarded the prestigious German Red Dot Design Award 2017</li></ul><p><br></p>",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f15d9b3e520d44421ed8e9d-1604699042286.jpeg",
          "http://localhost:3000/public/uploads/5f15d9b3e520d44421ed8e9d-1604699042286.jpeg",
          "http://localhost:3000/public/uploads/5f15d9b3e520d44421ed8e9d-1604699042287.jpeg",
          "http://localhost:3000/public/uploads/5f15d9b3e520d44421ed8e9d-1604699042288.jpeg"
        ])
      },{
        image: "http://localhost:3000/public/uploads/Bosch-BHN24L-1604698311860.png",
        brand: "Bosch",
        price: 1000,
        rating: 4.0,
        numReviews: null,
        isFeatured: true,
        name: "Bosch BHN24L",
        description: "Handheld Vacuum Cleaner for dirt collection and hardwood floors, operating time: 45 min, charging time: 5 hr(s), battery type: Li-ion, crevice tool, colour: black\n",
        category: 4,
        reviews: JSON.stringify([
          {
            "avatar": "https://pbs.twimg.com/profile_images/1760228143/Vetor-Johnny-Bravo-Vetorizado-Corel_400x400.jpg",
            "name": "Johnny Bravo",
            "review": "Amazing experience all around"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/asterix/images/3/3c/Asterix.png",
            "name": "Asterix",
            "review": "It's very hard. Only managed with resource to magic potion"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Coyote.gif",
            "name": "Wild Coyote",
            "review": "All my trickery and tools paid of. Thank ACME for suggesting this product to me"
          }
        ]),
        countInStock: 2,
        richDescription: "<p>This Bosch BHN24L handheld vacuum cleaner will quickly help you to tidy up small messes around your home. It is best suited for hard floors. When it is fully charge, which takes 5 hr(s), it will operate for 45 min. It uses the li-ion battery.&nbsp;<strong>You can count on the device to contain up to&nbsp;0,3 l.&nbsp;</strong>This model comes with an extention cord, so you don't have to deal with an external one. This model connects to an outlet via cable.</p><p><br></p>",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f15da13e520d44421ed8e9e-1604698334080.jpeg",
          "http://localhost:3000/public/uploads/5f15da13e520d44421ed8e9e-1604698334082.jpeg",
          "http://localhost:3000/public/uploads/5f15da13e520d44421ed8e9e-1604698334084.jpeg",
          "http://localhost:3000/public/uploads/5f15da13e520d44421ed8e9e-1604698334086.jpeg"
        ])
      },{
        image: "http://localhost:3000/public/uploads/Gallet-Gourmet-MAH-502-1604698719837.png",
        brand: "Gallet ",
        price: 1200,
        rating: null,
        numReviews: null,
        isFeatured: true,
        name: "Gallet Gourmet MAH 502",
        description: "Hotdog Maker - 380W, for 1-12 hotdogs, 2x switches, 2 vertical push-pins, non-stick surface cooking container, removable attachment for cooking 1-6 eggs, can cook corn",
        category: 4,
        reviews: JSON.stringify([
          {
            "avatar": "https://pbs.twimg.com/profile_images/1760228143/Vetor-Johnny-Bravo-Vetorizado-Corel_400x400.jpg",
            "name": "Johnny Bravo",
            "review": "Amazing experience all around"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/asterix/images/3/3c/Asterix.png",
            "name": "Asterix",
            "review": "It's very hard. Only managed with resource to magic potion"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Coyote.gif",
            "name": "Wild Coyote",
            "review": "All my trickery and tools paid of. Thank ACME for suggesting this product to me"
          }
        ]),
        countInStock: 2,
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f15da135420d44443ed8e9e-1604698716796.jpeg",
          "http://localhost:3000/public/uploads/5f15da135420d44443ed8e9e-1604698716798.jpeg",
          "http://localhost:3000/public/uploads/5f15da135420d44443ed8e9e-1604698716799.jpeg",
          "http://localhost:3000/public/uploads/5f15da135420d44443ed8e9e-1604698716800.jpeg"
        ]),
        richDescription: "<h2>Gallet Gourmet MAH 502</h2><p>A home-helper that lets you easily prepare your favorite snacks - this is the GALLET MAH 502 hotdog maker, which truly represents a multifunctional device of unsurpassed possibilities. The solid transparent main container has a&nbsp;non-stick surface and&nbsp;<strong>allows 1-12 hotdogs&nbsp;to be prepared at once</strong>. If you replace it with a plastic attachment, you can cook 1-6&nbsp;eggs or even corn.&nbsp;Two vertical socket pins made of stainless steel with their own switches are used to heat rolls. It can therefore be switched on independently of the cooking container. A thermal fuse provides smooth operation without any complications. Handling&nbsp;safety is ensured with a durable grip and&nbsp;anti-slip feet provide countertop stability. The fact that all the parts are&nbsp;dishwasher safe makes cleaning and&nbsp;maintenance a breeze.</p><p><br></p><h2>Key features</h2><ul><li>Multifunctional device&nbsp;- hotdog heating (up to 12 at a time), eggs (up to 6 at a time), corn and bread</li><li>Two switches for individual activation of the cooking container and a pair of rods for heating the bread</li><li>Plastic lid to cover&nbsp;the cooking vessel + opening for steam exhuast</li><li>Signal operation of the appliance through the backlight of the buttons</li><li><strong>The possibility of washing individual parts in the dishwasher</strong></li><li>Power consumption 380W</li><li>Dimensions: 345 × 240 × 180mm</li></ul><p><br></p>"
      },{
        image: "http://localhost:3000/public/uploads/Lenovo-ThinkPad-X1-Carbon-7-1604665448351.png",
        brand: "Lenovo",
        price: 60,
        rating: null,
        numReviews: null,
        isFeatured: true,
        name: "Lenovo ThinkPad X1 Carbon 7",
        description: "Laptop - Intel Core i5 8265U Whiskey Lake, 14\" IPS anti-glare 1920 × 1080, RAM 16GB DDR4, Intel UHD Graphics 620",
        category: 3,
        reviews: JSON.stringify([
          {
            "avatar": "https://pbs.twimg.com/profile_images/1760228143/Vetor-Johnny-Bravo-Vetorizado-Corel_400x400.jpg",
            "name": "Johnny Bravo",
            "review": "Amazing experience all around"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/asterix/images/3/3c/Asterix.png",
            "name": "Asterix",
            "review": "It's very hard. Only managed with resource to magic potion"
          },
          {
            "avatar": "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Coyote.gif",
            "name": "Wild Coyote",
            "review": "All my trickery and tools paid of. Thank ACME for suggesting this product to me"
          }
        ]),
        countInStock: 7,
        richDescription: "<h2>Lenovo ThinkPad X1 Carbon 7</h2><p>The miniature Lenovo ThinkPad X laptop does everything you need it to do.&nbsp;<strong>The hybrid's carbon and metal chassis&nbsp;guarantees durability and extremely low weight.&nbsp;</strong>The Lenovo ThinkPad X1 Carbon 7 boasts a configuration that makes it ideal for students and other users who require good computer performance.. Better yet, all this power and speed is packed into a nicely compact body. The device incorporates a powerful and efficient quad-core&nbsp;<strong>Intel Core i5&nbsp;processor</strong>. For your data there is a respectably large SSD that speeds up the entire system.&nbsp;<strong>The notebook is also equipped with a backlit keyboard&nbsp;for comfortable night time work.&nbsp;</strong>A fast fingerprint reader ensures top-notch security. Also worth mentioning is the preinstalled Windows 10 Pro operating system.</p><h2>Key Features of the 14\" Lenovo ThinkPad X1 Carbon 7 Mini Notebook</h2><ul><li>Painstakingly designed metal and carbon construction</li><li><strong>Lenovo ThinkPad X&nbsp;laptop is equipped with a&nbsp;14\"&nbsp;display</strong></li><li>IPS panel technology with Full HD resolution</li><li>Intel Core i5 8265U Whiskey Lake processor</li><li><strong>512GB&nbsp;SSD capacity</strong></li><li>Backlit keyboard</li><li>Fingerprint reader for quick and easy login</li><li>Lenovo ThinkPad X1 Carbon 7 Laptop is powered by Windows 10 Pro</li><li>The notebook's battery can last up to 18,3 hr(s)</li><li>Mobile internet connection thanks to the integrated 4G/LTE modem</li><li>Easy docking station connection</li><li>Classy black chassis colour</li><li>Weight: 1.09kg</li><li>Lenovo notebook dimensions: 323.5 × 14.9 × 217.1mm</li></ul><p><br></p>",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f15da135420d44456ed8e9e-1604665545871.jpeg",
          "http://localhost:3000/public/uploads/5f15da135420d44456ed8e9e-1604665545872.jpeg",
          "http://localhost:3000/public/uploads/5f15da135420d44456ed8e9e-1604665545875.jpeg"
        ])
      },{
        image: "http://localhost:3000/public/uploads/Beurer-BEU-FC40-1604696292516.png",
        brand: "Beurer",
        price: 23,
        rating: null,
        numReviews: null,
        isFeatured: false,
        name: "Beurer BEU-FC40",
        description: "Vacuum Skin Cleanser - face cleaning, deep pore cleaning thanks to vacuum technology, versatile, modern design, effectively removes dirt from the skin and promotes healthy looking skin",
        category: 2,
        countInStock: 10,
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f68fd316170530b7e0afc54-1604696288820.jpeg",
          "http://localhost:3000/public/uploads/5f68fd316170530b7e0afc54-1604696288824.jpeg",
          "http://localhost:3000/public/uploads/5f68fd316170530b7e0afc54-1604696288826.jpeg",
          "http://localhost:3000/public/uploads/5f68fd316170530b7e0afc54-1604696288828.jpeg"
        ]),
        richDescription: "<h2>Fresh and healthy looking skin</h2><p>Beurer FC 40 Face Cleaning Kit uses vacuum technology for&nbsp;<strong>deep pore cleaning and dirt removal.</strong>&nbsp;Regular treatment results in healthy looking skin and its younger appearance. Included are 3 replaceable attachments of different sizes and 10 replacement filters.</p><p><br></p><h2>Key features of the Beurer FC 40 cleaning kit</h2><ul><li>Vacuum technology for deep pore cleaning</li><li><strong>Suitable for all skin types</strong></li><li>5 intensity levels</li><li>LCD display</li><li>Powered by battery or mains</li><li>Operating time per battery charge 1.5 hours</li><li>Battery charging time 5 hours</li><li>Modern design</li><li>3 interchangeable attachments of different sizes</li></ul><p><br></p>"
      },{
        image: "http://localhost:3000/public/uploads/iPhone-SE-64GB--1600721926416.jpg",
        brand: "Apple",
        price: 1000,
        rating: null,
        numReviews: null,
        isFeatured: false,
        name: "iPhone SE 64GB",
        description: "Mobile Phone 4,7\" IPS 1334×750, processor Apple A13 Bionic 6-core, RAM 3 GB, internal memory 64 GB, main camera 12 Mpx (f/1,8), selfie camera 7 Mpx, optical stabilization, GPS, Glonass, NFC, LTE, Lightning port, fingerprint reader, single SIM + eSIM, water resistant IP67, unlocked, quick charging 18W, wireless charging, iOS 13",
        category: 1,
        countInStock: 8,
        richDescription: "<h2>iPhone SE 64GB Black 2020</h2><p>What is clear is that the iPhone SE 64GB Black 2020 is a marvelous smartphone. It will let you use the net&nbsp;<strong>and take photos and videos&nbsp;</strong>or even play games. Thanks to the screen, which measures 4,7\", it's a small model. It is designed with a 6 core processor Apple A13 Bionic.&nbsp;<strong>The RAM&nbsp;offers a capacity of&nbsp;3 GB</strong>. Such performance allows you to run demanding games. For applications and files, this phone has RAM with a size of 64 GB, so you won't have problems with space, and it can handle a large collection of games or applications. Another important feature is its connector interface, which uses Lightning port. A great feature is the water resistance of this smartphone. It has a protection value of 67 mm.</p><p><br></p><h2>The iPhone SE 64GB Black 2020 Smartphone Key Features</h2><ul><li><strong>Water-resistant design</strong></li><li>iPhone SE 64GB Black 2020 has IPS screen measuring 4,7\" with a resolution of 1334×750</li><li>RAM of 3 GB and Apple A13 Bionic CPU</li><li>Supports SIM cards that use&nbsp;<strong>Single SIM + eSIM</strong></li><li>NFC capabilities for fast pay and data transfer</li><li>Back camera has a resolution of 12 Mpx</li><li>Fingerprint reader for security</li><li>Practical and convenient wireless charging</li><li>Maximum power of wire charging is 18 W</li></ul><p><br></p>",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f691406c7e42c1d374fee5c-1604697613631.jpeg",
          "http://localhost:3000/public/uploads/5f691406c7e42c1d374fee5c-1604697613634.jpeg",
          "http://localhost:3000/public/uploads/5f691406c7e42c1d374fee5c-1604697613635.jpeg"
        ])
      },{
        richDescription: "<h2>Dell G3 15 Gaming (3590) black</h2><p class=\"ql-align-center\"><br></p><p><span style=\"color: rgb(128, 128, 128);\">Gaming Laptop - Intel Core i7 9750H Coffee Lake, 15.6\" IPS matte 1920 × 1080 144 Hz, RAM 16GB DDR4, NVIDIA GeForce GTX 1660 Ti Max-Q 6GB, SSD 256GB + HDD 1TB 5400 RPM, numeric keypad, backlit keyboard, webcam, USB 3.2 Gen 1, USB-C, fingerprint reader, WiFi 802.11ac, 3-cell battery of 51 Wh, Windows 10 Home (NBD)</span></p><p><br></p><h3>Dynamic Turbo Boost Mode</h3><p>When gaming gets critical, give your system a turbo-boost that can be unleashed at a moment's notice. Easily activated by pressing F7 on the Dell G3 15's keyboard: Game Shift triggers a dynamic performance mode within the Alienware Command Center without ever having to leave your gameplay. This maximizes the fans speed to keep your system cool while the processors work harder.&nbsp;</p><p><br></p><p><br></p><h3>Sharp Details</h3><p><span style=\"color: rgb(68, 68, 68);\">With its 15-inch, narrow-frame display with WVA technology and Full HD, the game is sharp and clear from almost any angle.</span></p><p><span style=\"color: rgb(68, 68, 68);\">Powered by NVIDIA Turing architecture, the NVIDIA GeForce GTX 1660 Ti&nbsp;delivers amazing performance and innovative new gaming technologies.</span></p>",
        image: "http://localhost:3000/public/uploads/Dell-G3-15-Gaming-1604663974713.png",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f9d37371575750024b1f462-1604664869588.jpeg",
          "http://localhost:3000/public/uploads/5f9d37371575750024b1f462-1604664869592.jpeg",
          "http://localhost:3000/public/uploads/5f9d37371575750024b1f462-1604664869593.jpeg",
          "http://localhost:3000/public/uploads/5f9d37371575750024b1f462-1604664869597.jpeg"
        ]),
        brand: "Dell",
        price: 1200,
        rating: null,
        numReviews: null,
        isFeatured: false,
        name: "Dell G3 15 Gaming",
        description: "Gaming Laptop - Intel Core i7 9750H Coffee Lake, 15.6\" IPS matte 1920 × 1080 144 Hz",
        category: 3,
        countInStock: 6,
      },{
        richDescription: "<h2><strong>Fenité Sonic Face Brush ETA035290010</strong></h2><p>Take care of your skin professionally with the Fenité ETA035290010 Sonic Face Brush. Cleanse your skin deeply, enjoy a pleasant massage and smooth your skin. It contributes to better blood supply to the skin, effectively removes makeup residues and better absorbs skin cosmetics. This brush will make your skin&nbsp;<strong>brighter, supple, smoother and unified</strong>&nbsp;.</p><p><br></p><h2><strong>Innovative technologies</strong></h2><p>Fenité sonic skin brush with innovative Sonic-Touch technology cleans the skin in depth, removing up to 99% of dirt and make-up residue.</p>",
        image: "http://localhost:3000/public/uploads/ETA-0352-90010-Fenité-1604696605425.png",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f9d5de284992b00247682b3-1604696602193.jpeg",
          "http://localhost:3000/public/uploads/5f9d5de284992b00247682b3-1604696602196.jpeg",
          "http://localhost:3000/public/uploads/5f9d5de284992b00247682b3-1604696602197.jpeg",
          "http://localhost:3000/public/uploads/5f9d5de284992b00247682b3-1604696602198.jpeg",
          "http://localhost:3000/public/uploads/5f9d5de284992b00247682b3-1604696602198.jpeg"
        ]),
        brand: "ETA",
        price: 26,
        rating: null,
        numReviews: null,
        isFeatured: false,
        name: "ETA 0352 90010 Fenité",
        description: "Skin Cleansing Brush - sonic face brush, for deep cleansing, massage and skin smoothing; innovative Sonic-Touch technology; removes up to 99% of dirt and make-up; hygienic silicone design;",
        category: 2,
        countInStock: 4,
      },{
        richDescription: "<h2>Philips Advanced IPL World</h2><h3>Use on body and face</h3><h3>SC1997/00</h3><p><br></p><p>Are you looking for perfectly smooth skin without needless hair? The Philips World IPLL epilator provides you with the latest IPL technology to get rid of them quickly, comfortably and painlessly - providing up to 75% hair loss after 4 treatments.*</p><p><br></p><p>* Measured on legs after initial 4-5 treatments. Individual results may vary.</p><p><br></p>",
        image: "http://localhost:3000/public/uploads/Philips-Lumea-IPL-Advanced--1604697130862.png",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5f9d5ef084992b00247682b4-1604697146734.png",
          "http://localhost:3000/public/uploads/5f9d5ef084992b00247682b4-1604697146735.png",
          "http://localhost:3000/public/uploads/5f9d5ef084992b00247682b4-1604697146736.png"
        ]),
        brand: "Philips",
        price: 25,
        rating: null,
        numReviews: null,
        isFeatured: false,
        name: "Philips Lumea IPL Advanced",
        description: "IPL Epilator - for face, legs, private parts, back and body, uv filter and skin shade sensor, 250000 flashes, 2 extension(s), 5 modes, power supply: mains (230V)\n",
        category: 2,
        countInStock: 1,
      },{
        richDescription: "<h2>Samsung Galaxy S10e Dual SIM Black</h2><p>It is obvious that the Samsung Galaxy S10e Dual SIM Black is a very smart smartphone. With it, you can connect to the internet<strong>, as well as take photos or videos&nbsp;with the dual camera&nbsp;</strong>or play fun games. Thanks to its display that measures 5,8\", it's a medium sized model. It is designed with a 8 core processor Samsung Exynos 9820.&nbsp;<strong>The phone's RAM&nbsp;has a size of&nbsp;6 GB</strong>. This offers above-standard performance for 3D games and virtual reality. For apps and files, this phone has RAM of 128 GB, so it is powerful enough for very frequent content storage and hundreds of applications. This Samsung Galaxy S10e Dual SIM Black smartphone runs on the battery with a capacity of 3100 mAh. This model can be charged&nbsp;<strong>with fast wireless charging</strong>. Another feature is its connector interface, which uses Jack (3,5mm) and USB-C. An important feature is the water resistance of this phone. It has a protection value of 68 mm. A big advantage is that it's capable of reverse charging, with which you'll be able to charge another phone using wireless technology and your device.</p>",
        image: "http://localhost:3000/public/uploads/Samsung-Galaxy-S10e-Dual-SIM-Black-1604697997106.png",
        images: JSON.stringify([
          "http://localhost:3000/public/uploads/5fa5bf8d9791235c46678e15-1604698067960.jpeg",
          "http://localhost:3000/public/uploads/5fa5bf8d9791235c46678e15-1604698067963.jpeg",
          "http://localhost:3000/public/uploads/5fa5bf8d9791235c46678e15-1604698067964.jpeg"
        ]),
        brand: "Samsung",
        price: 400,
        rating: null,
        numReviews: null,
        isFeatured: true,
        name: "Samsung Galaxy S10e Dual SIM Black",
        description: "Mobile Phone 5,8\" AMOLED 2280 × 1080, processor Samsung Exynos 9820 8-core, RAM 6 GB, internal memory 128 GB, Micro SDXC up to 512 GB, main camera 12 Mpx (f/1,5) + 16 Mpx (f/2,2), selfie camera 10 Mpx, optical stabilization, GPS, Glonass, NFC, LTE, Jack (3,5mm) and USB-C, fingerprint reader, hybrid slot, water resistant IP68, unlocked, quick charging 15W, wireless charging 15W, reverse charging 9W, battery 3100 mAh, Android 9.0 Pie\n",
        category: 1,
        countInStock: 12,
      }
    ]
    await queryInterface.bulkInsert('products', productsData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'products_category_fk');
    await queryInterface.dropTable('products');
  }
};
