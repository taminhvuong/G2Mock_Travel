INSERT INTO `User` 	(`username`,			`email`,						`password`,														`firstName`,		`lastName`, 	`status`, 	`role`,  		`avatarUrl`			)
VALUE				('hungnguyen',				'hung@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyen',		'Hung',				1, 		'Admin'	,		'1613362949329.png'	),
               ('minhvuong',				'duynn03@gmail.com', 			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Minh',		'Vuong',				1, 		'Admin'	,		'1613362949329.png'	);
     
	  
INSERT INTO `Tour` 	(`codeTour`,			`description`,						`startingGate`,		`tourTime`,		`vehicle`, 	`destination`		)
VALUE				('NDSGN555',				'', 			'TP. Hồ Chí Minh',		'3',		'Xe du lịch',				 'Phan Thiết - Mũi Né - KDL Núi Tà Cú - Đồi Cát Bay'		),
					('NDSGN303',				'', 			'TP. Hồ Chí Minh',		'3',		'Máy bay, Xe du lịch',				 'Đà Nẵng - Bà Nà - Cầu Vàng - Sơn Trà - Biển Mỹ Khê - Hội An - Đà Nẵng '		),
               ('NDSGN5251',				'', 			'TP. Hồ Chí Minh',		'5',		'Xe du lịch',				'Hành trình Hoa và Biển: Đà Lạt - Nha Trang' 		);
              
INSERT INTO `DetailTour` 	(		`date`,						`description`,		`codeTour`		)
VALUE				(				'Ngày 1', 			'Quý khách tập trung tại Công ty Vietravel (190 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.Hồ Chí Minh) khởi hành đi Phan Thiết. Quý khách ăn sáng trên cung đường đi và dừng chân tham quan:

- Khu du lịch Núi Tà Cú: Trải nghiệm đi cáp treo lên đỉnh núi độ cao 505m (chi phí tự túc), ngắm cảnh đồng bằng Hàm Thuận Nam với những vườn Thanh long trái chín đỏ được trồng thành từng hàng thẳng tắp xanh bạt ngàn. Viếng chùa Linh Sơn Trường Thọ: Với bộ tượng tam thế Phật được tạc bằng gỗ trầm hương trên 100 năm tuổi và được xếp hạng Di tích lịch sử – Văn hoá Quốc gia. Chiêm viếng tượng Phật Thích Ca nhập niết bàn lớn nhất Đông Nam Á, dài 49m, cao 11m.

Sau bữa trưa, đoàn tiếp tục hành trình đến thành phố Phan Thiết. Quý khách nhận phòng và nghỉ ngơi. Buổi chiều, đoàn đến tham quan:

- Tranh Cát Phi Long: Nơi đây nổi tiếng với những bức tranh làm bằng cát mang nhiều chủ đề như thiên nhiên, muông thú, chân dung, danh lam thắng cảnh...Các tác phẩm nghệ thuật này càng ý nghĩa hơn vì được vẽ bởi những anh chị em khiếm thị và khiếm thính.

Quý khách làm thủ tục nhận phòng và nghỉ ngơi. Đoàn dùng bữa tối tại nhà hàng địa phương và tự do khám phá thành phố biển về đêm. ','NDSGN555'	),
               (				'Ngày 2', 			'Quý khách dùng bữa sáng tại khách sạn. Sau đó xe đưa đoàn khởi hành theo cung đường ven biển Mũi Né. Ngồi trên xe, Quý khách sẽ được chiêm ngưỡng cảnh đẹp của vùng đất Bình Thuận như: Lầu Ông Hoàng, Tháp chăm Poshanu, Bãi Đá Ông Địa, Rạng Dừa Hàm Tiến,… Đoàn dừng chân tham quan:

- Đồi Cát Bay: Một trong những khu vực đẹp nhất nằm ở Mũi Né thu hút khá nhiều du khách do hình dáng đẹp của cát và màu sắc của cát, nơi đây được xem là đồi cát có một không hai tại Việt nam bắt nguồn từ mỏ sắt cổ tồn tại hàng trăm năm tạo nên. 

- Lâu đài Rượu Vang RD: Nghe giới thiệu về quy trình sản xuất, đóng chai và thưởng thức một trong những loại rượu vang hảo hạng nổi tiếng thế giới được xuất xứ từ Thung Lũng Napa (Mỹ). 

Quý khách dùng bữa trưa tại nhà hàng. Sau đó xe đưa đoàn đi tham quan:

- Làng Chài Xưa Mũi Né: với lịch sử 300 năm cái nôi của nghề làm nước mắm, trải nghiệm cảm giác lao động trên đồng muối, đi trên con đường rạng xưa, thăm phố cổ Phan Thiết, , thăm nhà lều của hàm hộ nước mắm xưa, đắm chìm cảm xúc trong biển 3D và thích thú khi đi chợ làng chài xưa với bàn tính tay, bàn cân xưa thú vị,…

Buổi chiều, xe đưa quý khách dùng bữa tối với món lẩu thả nổi tiếng khu vực Bình Thuận và trở về khách sạn nghỉ ngơi.',					'NDSGN555' 		),
               (			'Ngày 3', 			'Quý khách dùng bữa sáng tại khách sạn và tự do tắm biển đến giờ trả phòng. Đoàn khởi hành về TP. Hồ Chí Minh. Trên đường, Quý khách dùng bữa trưa và dừng chân tham quan: 
 
- Mua sắm đặc sản Phan Thiết sạch tại Organik Farm - Hello Muine (chi phí tự túc) - nước mắm rin nguyên chất, nước mắm Nhật Shiitake, mực một nắng, khô cá dứa, nước cốt thanh long… về làm quà cho người thân và bạn bè. 
- Dinh Vạn Thủy Tú: nơi thờ và trưng bày bộ xương cá Ông lớn nhất Việt Nam. Quý khách còn có cơ hội tìm hiểu về tục thờ cá Ông của ngư dân miền Trung.

Buổi chiều, Đoàn về đến TP.Hồ Chí Minh, xe đưa về điểm đón ban đầu. Chia tay Quý khách và kết thúc chương trình du lịch.
',		'NDSGN555'				 		),
(				'Ngày 1', 			'Quý khách tập trung tại điểm hẹn, Ga đi trong nước, sân bay Tân Sơn Nhất. Hướng dẫn viên Vietravel hỗ trợ làm thủ tục cho đoàn đáp chuyến bay đi Đà Nẵng. Tại sân bay Đà Nẵng xe và HDV Vietravel đón đoàn đi tham quan: 
- Bán đảo Sơn Trà và Viếng Chùa Linh Ứng: Nơi đây có tượng Phật Quan Thế Âm cao nhất Việt Nam, đứng nơi đây, Quý khách sẽ được chiêm ngưỡng toàn cảnh thành phố, núi rừng và biển đảo Sơn Trà một cách hoàn hảo nhất. 
- Ngũ Hành Sơn: Động Tàng Chơn, Động Hoa Nghiêm, Chùa Non Nước, Làng Đá Mỹ Nghệ,..

- Làng Đá Non Nước Nguyễn Hùng: mua sắm sản phẩm đá mỹ nghệ tạo phong thủy cho tổ ấm hoặc làm quà tặng ý nghĩa cho người thân và bạn bè.
- Phố Cổ Hội An: Chùa Cầu, Nhà Cổ Phùng Hưng, Hội Quán Phước Kiến, Cơ sở Thủ Công Mỹ Nghệ,…Quý khách tự do dạo phố đèn lồng đầy màu sắc, cảm nhận sự yên bình cổ kính và lãng mạn Phố Cổ về đêm,... 

Buổi tối quý khách tự do dạo phố ngắm nhìn sự lung linh và phát triển của thành phố ….  ','NDSGN303'	),
               (				'Ngày 2', 			'Dùng bữa sáng tại khách sạn. Xe đưa Quý khách đi tham quan:
- Khu du lịch Bà Nà (chi phí cáp treo & Ăn trưa tự túc): tận hưởng không khí se lạnh của Đà Lạt tại miền Trung, đoàn tự do tham quan Chùa Linh Ứng, Hầm Rượu Debay, vườn hoa Le Jardin D’Amour, Khu Tâm linh mới của Bà Nà viếng Đền Lĩnh Chúa Linh Từ, khu vui chơi Fantasy Park, tự do chụp hình tại Cầu Vàng điểm tham quan mới siêu hot tại Bà Nà…Ăn trưa tại Bà Nà tự túc. Sau đó đoàn tiếp tục tham quan vui chơi đến giờ xuống cáp. 
- Bãi biển Mỹ Khê: Một trong những bãi biển quyến rũ nhất hành tinh. Quý khách tự do dạo biển, chụp hình....
Buổi tối Quý khách tự túc đi dạo phố, thưởng thức đặc sản địa phương; thưởng ngoạn cảnh đẹp của Đà Nẵng về đêm, ngắm nhìn Cầu Rồng, Cầu Tình Yêu, Cầu Trần Thị Lý, Trung Tâm Thương Mại, Khu phố ẩm thực, Café - Bar - Disco…
 ',					'NDSGN303' 		),
               (			'Ngày 3', 			'Dùng bữa sáng tại khách sạn.

- Mua sắm đặc sản phố biển tại Hương Đà: với hơn 2000 sản phẩm đặc sản Đà Nẵng, Miền Trung và các vùng miền lân cận, nổi bật nhất là chả bò, bò khô, mực rim me, mực khô, ghẹ sữa sốt và đầy đủ các loại khô cá,...

Xe tiễn Quý khách ra sân bay Đà Nẵng đón chuyến bay trở về Tp.Hồ Chí Minh. Chia tay Quý khách và kết thúc chương trình du lịch tại sân bay Tân Sơn Nhất

Lưu ý:
- Hành trình có thể thay đổi thứ tự điểm đến tùy vào điều kiện thực tế. 
- Lịch trình tham quan (tắm biển, ngắm hoa, trải nghiệm,...) rất dễ bị ảnh hưởng bởi thời tiết. Đây là trường hợp bất khả kháng mong Quý khách hiểu và thông cảm.
- Khách Sạn có thể ở xa trung tâm thành phố vào các mùa Cao Điểm',		'NDSGN303'				 		),
	(				'Ngày 1', 			'Quý khách tập trung tại Vietravel (190 Pasteur, phường Võ Thị Sáu, quận 3, TP.HCM), xe đưa đoàn khởi hành đi Đà Lạt. Trên đường đi Quý khách ghé tham quan:

- Thác Bobla: đẹp như một bức tranh thiên nhiên với dòng thác nguyên sơ, hùng vĩ cao hơn 40m, rộng hơn 20m, cùng cảnh quan được tôn tạo tuyệt đẹp, lưu giữ nhiều cây cổ thụ hàng trăm năm tuổi, phía xa hút tầm mắt là những đồi chè, cà phê xanh mát.
- Ga Đà Lạt: nhà ga cổ kính nhất Việt Nam và Đông Dương, có phong cách kiến trúc độc đáo với ba mái hình chóp cách điệu như ba đỉnh núi Langbiang và nhà rông Tây Nguyên.

Đến Đà Lạt sau khi ăn chiều, Quý khách nhận phòng khách sạn nghỉ ngơi

Buổi tối, Quý khách tự do dạo phố thưởng thức ẩm thực nổi tiếng phố núi: Lẩu gà lá é Tao Ngộ, Lẩu bò quán Gỗ, Bánh ướt lòng gà, Ốc nhồi thịt, Xe lẩu buffet, Ngói BBQ … hoặc đến Nhạc Quán Diễm Xưa lắng nghe những tình khúc bất hủ của nhạc sỹ Trịnh Công Sơn … (chi phí tự túc). 
','NDSGN5251'	),
	(				'Ngày 2', 			'Ăn trưa, đoàn về khách sạn nghỉ ngơi. Buổi chiều đoàn tiếp tục tham quan:
- KDL Cao Nguyên Hoa: với diện tích hơn 122ha, là nơi bảo tồn đa dạng sinh học đặc biệt là các lòai hoa thân gỗ không chỉ có ở Đà Lạt mà còn trên toàn Thế giới với mảng xanh của rừng - thảm cỏ tự nhiên rộng khắp, điểm xuyến những khóm hoa Thanh Anh nhẹ nhàng dọc lối đi. Đến đây Quý khách sẽ được trải nghiệm: 
- Quán Seven-T Coffee nằm giữa rừng thông với view 360° núi đồi xanh mát, bể bơi vô cực giữa rừng nhiệt đới 
- Xả stress và ghi lại những khoảnh khắc đẹp với Đà Lạt Swing – trò chơi “xích đu tiên” lớn nhất Việt Nam. 
- Rose Garden – Vườn hoa hồng với hàng trăm gốc hồng ngoại, hồng nội, hồng cổ thụ quý hiếm tỏa hương khoe sắc bốn mùa. 
- Con đường rừng nhiệt đới dẫn lối đến gốc si cổ thụ nghìn năm huyền bí và cổ kính. 
- Thoả sức chụp hình check in với dàn siêu xe cực chill, cực chất hay ngôi nhà phù thủy, đồi mai anh đào, đồi huệ sông nile, đồi hoa sim tím, đồi hoa hoàng yến,… ','NDSGN5251'	),
	(				'Ngày 3', 			' Sau khi dùng bữa sáng, đoàn khởi hành tham quan:
- Fairytale Land & hầm rượu vang Vĩnh Tiến: đến đây du khách như lạc vào khu vườn cổ tích của những chú lùn Hobbiton, điểm xuyến trong khu vườn là những ngôi nhà độc đáo và đầy sắc màu, những bức vẽ trên tường đầy lôi cuốn và những thảm hoa nhỏ không kém phần quyến rũ. Dạo một vòng quanh khu vườn đừng quên rảo bước vào hầm rượu vang với hơn 10.000 chai đang được lưu trữ dưới hầm.

Quý khách ăn trưa, đoàn tiếp tục khởi hành đi Nha Trang. 
','NDSGN5251'	),
	(				'Ngày 4', 			' Sau khi dùng buffet sáng tại khách sạn, xe đưa đoàn đến cảng xuống tàu du ngoạn và tham quan:

- Hòn Lao - Đảo Khỉ: nơi có hơn 1000 chú khỉ đang được bảo tồn và sinh sống tự nhiên. Quý khách tự do tắm biển, thư giãn, tham quan xem chương trình biểu diễn xiếc Khỉ, đua chó, khỉ bơi lội hoặc trải nghiệm các môn thể thao trên bãi biển và trò chơi: canô kéo dù, mô tô nước, đua xe công thức 1, bắn súng sơn, cưỡi đà điểu … (chi phí tự túc).

Sau khi dùng bữa trưa, Quý khách quay về trung tâm thành phố. Buổi chiều Quý khách ăn chiều tự túc và tự do nghỉ ngơi tại khách sạn hoặc tự túc chi phí điểm tham quan như sau:
du ngoạn trên du thuyền Emperor (chi phí tự túc), tàu sẽ di chuyển dọc thành phố biển Nha Trang, du khách sẽ được ngắm cảnh hoàng hôn đẹp nhất trong khi thưởng thức tiệc cocktail, bữa tối tinh tế và nghệ sỹ ghi ta, violon chơi những bản nhạc du dương trong một khung cảnh lãng mạn dưới trời sao, ánh trăng và ánh đèn rực rỡ của thành phố.
','NDSGN5251'	),
	(				'Ngày 5', 			'Sau khi dùuseruseruserng buffet sáng và trả phòng khách sạn. Xe đưa Quý khách đi tham quan:

- Trung tâm trang sức Princess Jewelry (đường Lê Hồng Phong): tham quan, tìm hiêu quy trình sản xuất ngọc trai, cách phân loại. Tại đây, Quý khách có thể lựa chọn cho mình những sản phẩm trang sức cao cấp nổi tiếng được gắn đá quý, ngọc trai cũng như những sản phẩm chất lượng cao được làm từ ngọc trai nuôi cấy tự nhiên.
-  Mua sắm đặc sản phố biển tại Hương Đà Nha Trang

Ăn trưa. Đoàn khởi hành về lại Tp.HCM. Trên đường về, đoàn dừng chân tại tham quan: 

- Làng Chài Xưa: với lịch sử 300 năm cái nôi của nghề làm nước mắm, trải nghiệm cảm giác lao động trên đồng muối, đi trên con đường rạng xưa, thăm phố cổ Phan Thiết, , thăm nhà lều của hàm hộ nước mắm xưa, đắm chìm cảm xúc trong biển 3D và thích thú khi đi chợ làng chài xưa với bàn tính tay, bàn cân xưa thú vị,…
','NDSGN5251'	);

INSERT INTO `Trip` 	(`codeTrip`,			`endDate`,						`startDate`,		`numberOfPassengers`,		`priceAdult`, 	`surcharge`	,`codeTour`	)
VALUE				('024-040623QH-7',				'2023-06-07 20:43:09.000000', 			'2023-06-04 20:43:09.000000',		30,	6990000,				 5000000,'NDSGN303'		),
					('024-100623QH-7',				'2023-06-13 20:43:09.000000', 			'2023-06-10 20:43:09.000000',		25,	6990000,				 5000000,'NDSGN303'		);
              
