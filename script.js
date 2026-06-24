document.addEventListener('DOMContentLoaded', function() {
    loadSettings();

    const welcomePopup = document.getElementById('welcomePopup');
    const closeWelcome = document.getElementById('closeWelcome');
    const hasWelcomed = sessionStorage.getItem('welcomeShown');

    if (welcomePopup && !hasWelcomed) {
        welcomePopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    if (closeWelcome && welcomePopup) {
        closeWelcome.addEventListener('click', function() {
            welcomePopup.style.display = 'none';
            document.body.style.overflow = 'auto';
            sessionStorage.setItem('welcomeShown', 'true');
        });
    }

    if (welcomePopup) {
        welcomePopup.addEventListener('click', function(e) {
            if (e.target === welcomePopup) {
                welcomePopup.style.display = 'none';
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('welcomeShown', 'true');
            }
        });
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // ====== نموذج الحجز ======
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    const successMessage = document.getElementById('successMessage');
    const bookingFields = document.getElementById('bookingFields');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const nameWords = fullName.split(/\s+/);

            if (nameWords.length !== 4) {
                showBookingMessage('❌ Please enter exactly 4 words for your full name.', 'error');
                return;
            }

            const phone = document.getElementById('phone').value.trim();
            if (!/^\d+$/.test(phone)) {
                showBookingMessage('❌ Phone number must contain numbers only.', 'error');
                return;
            }

            const email = document.getElementById('email').value.trim();
            if (!email) {
                showBookingMessage('❌ Please enter your email address.', 'error');
                return;
            }

            const service = document.getElementById('serviceType').value;
            if (!service) {
                showBookingMessage('❌ Please select a service type.', 'error');
                return;
            }

            const date = document.getElementById('bookingDate').value.trim();
            if (!/^\d{2}\/\d{2}$/.test(date)) {
                showBookingMessage('❌ Please enter date in format MM/DD (e.g. 06/21).', 'error');
                return;
            }

            const time = document.getElementById('bookingTime').value;
            if (!time) {
                showBookingMessage('❌ Please select a preferred time.', 'error');
                return;
            }

            // إخفاء رسائل الخطأ
            if (bookingMessage) {
                bookingMessage.style.display = 'none';
            }

            // إرسال البيانات عبر Fetch إلى FormSubmit
            const formData = new FormData(bookingForm);

            fetch('https://formsubmit.co/techscieandalus3@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (response.ok) {
                    // إخفاء الحقول والزر وإظهار رسالة النجاح
                    if (bookingFields) {
                        bookingFields.style.display = 'none';
                    }
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                } else {
                    showBookingMessage('❌ Something went wrong. Please try again.', 'error');
                }
            })
            .catch(function(error) {
                showBookingMessage('❌ Something went wrong. Please try again.', 'error');
            });
        });
    }

    function showBookingMessage(text, type) {
        if (bookingMessage) {
            bookingMessage.style.display = 'block';
            bookingMessage.style.color = type === 'success' ? '#2e7d32' : '#d32f2f';
            bookingMessage.style.background = type === 'success' ? '#e8f5e9' : '#ffebee';
            bookingMessage.style.padding = '15px';
            bookingMessage.style.borderRadius = '8px';
            bookingMessage.style.border = '2px solid ' + (type === 'success' ? '#2e7d32' : '#d32f2f');
            bookingMessage.textContent = text;
        }
    }

    // ====== نموذج تواصل معنا ======
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactMessageStatus');
    const successMessageContact = document.getElementById('successMessageContact');
    const contactFields = document.getElementById('contactFields');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmailInput').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !subject || !message) {
                showContactStatus('❌ Please fill in all required fields.', 'error');
                return;
            }

            // إخفاء رسائل الخطأ
            if (contactStatus) {
                contactStatus.style.display = 'none';
            }

            // إرسال البيانات عبر Fetch إلى FormSubmit
            const formData = new FormData(contactForm);

            fetch('https://formsubmit.co/techscieandalus3@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (response.ok) {
                    // إخفاء الحقول والزر وإظهار رسالة النجاح
                    if (contactFields) {
                        contactFields.style.display = 'none';
                    }
                    if (successMessageContact) {
                        successMessageContact.style.display = 'block';
                    }
                } else {
                    showContactStatus('❌ Something went wrong. Please try again.', 'error');
                }
            })
            .catch(function(error) {
                showContactStatus('❌ Something went wrong. Please try again.', 'error');
            });
        });
    }

    function showContactStatus(text, type) {
        if (contactStatus) {
            contactStatus.style.display = 'block';
            contactStatus.className = 'contact-status ' + type;
            contactStatus.textContent = text;
        }
    }

    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

const translations = {
    ar: {
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'المعلومات',
        booking: 'الحجز',
        contact: 'تواصل معنا',
        settings: 'الإعدادات',
        welcome_title: '🏛️ مرحباً بكم في',
        company_name: 'أندلس العلمية التقنية',
        welcome_desc: 'نقدم لكم أحدث الحلول التقنية والتدريبية المتخصصة في مجالات الذكاء الاصطناعي، الأمن السيبراني، صيانة الحواسيب والشبكات.',
        start_now: 'ابدأ الآن',
        hero_title: 'مرحباً بكم في أندلس التقنية',
        hero_desc: 'مركز تقني متخصص يقدم خدمات صيانة الحواسيب، الشبكات، والدعم الفني، بالإضافة إلى دورات تدريبية في الذكاء الاصطناعي، الأمن السيبراني، وتكنولوجيا المعلومات.',
        book_now: 'احجز خدمتك الآن',
        features_title: '🔹 خدماتنا المميزة',
        service1_title: 'صيانة الحواسيب',
        service1_desc: 'صيانة هاردوير وبرمجيات، تنظيف، وتركيب أنظمة تشغيل بأعلى جودة.',
        service2_title: 'الشبكات',
        service2_desc: 'تركيب وتشبيك الشبكات، صيانة شاملة، ودعم فني للشركات والمؤسسات.',
        service3_title: 'الذكاء الاصطناعي',
        service3_desc: 'دورات تدريبية متقدمة في الذكاء الاصطناعي وتطبيقاته العملية.',
        service4_title: 'الأمن السيبراني',
        service4_desc: 'تدريب احترافي في الأمن السيبراني وحماية الأنظمة والبيانات.',
        service5_title: 'تكنولوجيا المعلومات',
        service5_desc: 'دورات ICDL، IT، ودعم تقني متكامل للطلاب والشركات.',
        service6_title: 'التكنولوجيا الحديثة',
        service6_desc: 'مواكبة أحدث التقنيات وتطبيقاتها في مختلف المجالات.',
        service7_title: 'ICDL (الرخصة الدولية)',
        service7_desc: 'دورات تحضيرية لامتحان الرخصة الدولية لقيادة الحاسوب بجميع وحداته.',
        go_to_page: 'أنقر للذهاب للصفحة ←',
        company_footer: 'شركة أندلس العلمية التقنية',
        all_rights: 'جميع الحقوق محفوظة',
        settings_title: 'الإعدادات',
        settings_desc: 'خصص تجربتك مع الموقع: اختر اللغة، الألوان، والوضع المفضل',
        language: 'اللغة',
        language_desc: 'اختر اللغة التي تريد عرض الموقع بها',
        colors: 'الألوان',
        colors_desc: 'اختر اللون الأساسي للموقع',
        custom_color: 'لون مخصص:',
        theme: 'الوضع',
        theme_desc: 'اختر الوضع المفضل للموقع',
        light_mode: 'فاتح',
        dark_mode: 'داكن',
        reset_settings: 'إعادة تعيين الإعدادات',
        about_title: 'من نحن',
        about_desc: 'تعرف على شركة أندلس العلمية التقنية ورؤيتنا ورسالتنا',
        about_company: 'نبذة عن شركة أندلس العلمية التقنية',
        about_p1: 'شركة أندلس العلمية التقنية هي شركة أردنية متخصصة في تقديم الحلول التقنية والتدريب المهني، تهدف إلى تمكين الأفراد والمؤسسات من مواكبة التطور التكنولوجي وبناء مهارات عملية تلبي متطلبات سوق العمل الحديث.',
        about_p2: 'تقدم الشركة خدمات صيانة الحواسيب والشبكات، الحلول التقنية، التدريب الاحترافي، والاستشارات التقنية، بالإضافة إلى مجموعة من الدورات المتخصصة في مجالات الرخصة الدولية لقيادة الحاسوب (ICDL)، الذكاء الاصطناعي، الأمن السيبراني، وصيانة الحاسوب والشبكات.',
        about_p3: 'تسعى أندلس العلمية التقنية إلى تقديم برامج تدريبية تجمع بين الجانب النظري والتطبيق العملي بإشراف مدربين مؤهلين، مع التركيز على تطوير المهارات التقنية ورفع كفاءة المتدربين بما يتوافق مع احتياجات سوق العمل المحلي والإقليمي.',
        vision: '🌟 رؤيتنا',
        vision_text: 'أن نكون من الشركات الرائدة في مجال التدريب والتكنولوجيا في الأردن والمنطقة، من خلال تقديم خدمات تقنية وتعليمية عالية الجودة تساهم في بناء جيل رقمي مبدع ومؤهل.',
        mission: '🎯 رسالتنا',
        mission_text: 'تمكين الأفراد والمؤسسات من الاستفادة من أحدث التقنيات والمعارف الرقمية عبر التدريب العملي والخدمات التقنية المتميزة، بما يسهم في تحقيق التنمية المهنية والتكنولوجية المستدامة.',
        values: '💎 قيمنا',
        value1: 'الجودة والاحترافية.',
        value2: 'الابتكار والتطوير المستمر.',
        value3: 'المصداقية والشفافية.',
        value4: 'خدمة المجتمع ونشر المعرفة التقنية.',
        value5: 'التركيز على التطبيق العملي والنتائج الفعلية.',
        location: '📍 موقعنا في الأردن:',
        location_desc: 'يمكنكم زيارة مقرنا في هذا الموقع الجغرافي',
        services_title: 'صفحة المعلومات',
        services_desc: 'كل ما تحتاج معرفته عن خدماتنا التقنية والتدريبية',
        service_hardware: '🖥️ صيانة الحواسيب (هاردوير)',
        hardware_desc: 'نقدم خدمات متكاملة لصيانة الحواسيب على مستوى الهاردوير، تشمل:',
        hardware_li1: 'تشخيص أعطال المكونات المادية (المعالج، الرام، اللوحة الأم، مزود الطاقة).',
        hardware_li2: 'استبدال وترقية المكونات التالفة.',
        hardware_li3: 'تنظيف داخلي شامل للأجهزة.',
        hardware_li4: 'تركيب أنظمة التشغيل والبرامج الأساسية.',
        service_networks: '🌐 تركيب وتشبيك الشبكات',
        networks_desc: 'خدمات متخصصة في مجال الشبكات:',
        networks_li1: 'تركيب شبكات محلية (LAN) وشبكات واسعة (WAN).',
        networks_li2: 'توزيع نقاط الوصول (Access Points) لتحسين التغطية.',
        networks_li3: 'صيانة شاملة للشبكات وكابلات الألياف الضوئية.',
        networks_li4: 'إعداد الخوادم وإدارة الشبكات.',
        service_ai: '🤖 الذكاء الاصطناعي (AI)',
        ai_desc: 'دورات تدريبية احترافية في الذكاء الاصطناعي:',
        ai_li1: 'أساسيات الذكاء الاصطناعي وتعلم الآلة.',
        ai_li2: 'معالجة اللغة الطبيعية (NLP).',
        ai_li3: 'رؤية الحاسوب (Computer Vision).',
        ai_li4: 'تطبيقات الذكاء الاصطناعي في الأعمال.',
        service_tech: '📡 التكنولوجيا الحديثة',
        tech_desc: 'نواكب أحدث التقنيات العالمية:',
        tech_li1: 'إنترنت الأشياء (IoT).',
        tech_li2: 'الحوسبة السحابية (Cloud Computing).',
        tech_li3: 'الواقع الافتراضي والمعزز (VR/AR).',
        tech_li4: 'الطباعة ثلاثية الأبعاد.',
        service_it: '💻 تكنولوجيا المعلومات (IT)',
        it_desc: 'دورات ودعم في مجال IT:',
        it_li1: 'الرخصة الدولية لقيادة الحاسوب (ICDL).',
        it_li2: 'إدارة قواعد البيانات (SQL).',
        it_li3: 'برمجة التطبيقات والمواقع.',
        it_li4: 'الدعم الفني للشركات والمؤسسات.',
        service_cyber: '🔒 الأمن السيبراني',
        cyber_desc: 'دورات متخصصة في الأمن السيبراني:',
        cyber_li1: 'أمن الشبكات والأنظمة.',
        cyber_li2: 'اختبار الاختراق الأخلاقي (Penetration Testing).',
        cyber_li3: 'أمن التطبيقات والبيانات.',
        cyber_li4: 'الاستجابة للحوادث الأمنية.',
        service_icdl: '📜 ICDL (الرخصة الدولية لقيادة الحاسوب)',
        icdl_desc: 'دورات تحضيرية متكاملة لامتحان الرخصة الدولية لقيادة الحاسوب، تشمل جميع الوحدات الأساسية:',
        icdl_li1: 'مفاهيم تكنولوجيا المعلومات (IT Fundamentals).',
        icdl_li2: 'استخدام الحاسوب وإدارة الملفات (Computers and Files).',
        icdl_li3: 'معالجة النصوص (Word Processing).',
        icdl_li4: 'جداول البيانات (Spreadsheets).',
        icdl_li5: 'قواعد البيانات (Databases).',
        icdl_li6: 'العروض التقديمية (Presentations).',
        icdl_li7: 'مهارات الإنترنت والبريد الإلكتروني (Internet and Email).',
        go_to_booking: 'أنقر للذهاب لصفحة الحجز ←',
        booking_title: 'صفحة الحجز',
        booking_desc: 'احجز خدمتك أو دورتك التدريبية الآن بكل سهولة',
        booking_form_title: '📋 نموذج الحجز',
        full_name: 'الاسم الكامل (4 كلمات فقط) *',
        phone_number: 'رقم الهاتف *',
        email_address: 'البريد الإلكتروني *',
        service_type: 'نوع الخدمة *',
        select_service: '-- اختر الخدمة --',
        preferred_date: 'التاريخ المفضل (شهر/يوم فقط) *',
        preferred_time: 'الوقت المفضل (10:00 ص - 2:00 م) *',
        select_time: '-- اختر الوقت --',
        additional_notes: 'ملاحظات إضافية',
        confirm_booking: '✅ تأكيد الحجز',
        contact_title: 'تواصل معنا',
        contact_desc: 'نحن هنا لخدمتك – تواصل معنا بأي وقت',
        contact_info: '📌 معلومات الاتصال',
        address: '📍 العنوان:',
        jordan: 'الأردن',
        working_hours: '🕒 ساعات العمل:',
        working_hours_text: 'السبت – الخميس 10:00 ص – 2:00 م',
        view_map: 'عرض على خرائط جوجل ←',
        send_message: '✉️ أرسل رسالة',
        subject: 'الموضوع *',
        message: 'الرسالة *',
        send_btn: '📤 إرسال الرسالة',
        ai_title: 'الذكاء الاصطناعي',
        ai_desc: 'دورات تدريبية متقدمة في الذكاء الاصطناعي وتعلم الآلة',
        ai_what: 'ما نقدمه في الذكاء الاصطناعي',
        ai_what_desc: 'نقدم برامج تدريبية شاملة في الذكاء الاصطناعي تغطي الجوانب النظرية والعملية، بإشراف خبراء في المجال.',
        ai_basics: 'أساسيات الذكاء الاصطناعي',
        ai_basics_desc: 'مفاهيم أساسية، تاريخ الذكاء الاصطناعي، وتطبيقاته في الحياة اليومية.',
        ai_ml: 'تعلم الآلة (Machine Learning)',
        ai_ml_desc: 'خوارزميات التعلم الخاضع وغير الخاضع للإشراف، نماذج الانحدار والتصنيف.',
        ai_nlp: 'معالجة اللغة الطبيعية',
        ai_nlp_desc: 'تحليل النصوص، الترجمة الآلية، وبناء روبوتات المحادثة (Chatbots).',
        ai_cv: 'رؤية الحاسوب',
        ai_cv_desc: 'معالجة الصور والفيديو، التعرف على الوجوه والأشياء، وتطبيقاتها.',
        ai_register: '📅 سجل الآن في دورة الذكاء الاصطناعي',
        tech_title: 'التكنولوجيا الحديثة',
        tech_desc_page: 'مواكبة أحدث التقنيات العالمية وتطبيقاتها العملية',
        tech_fields: 'مجالات التكنولوجيا الحديثة',
        tech_fields_desc: 'نقدم دورات وورش عمل في أحدث مجالات التكنولوجيا لتأهيلك لسوق العمل المستقبلي.',
        tech_iot: 'إنترنت الأشياء (IoT)',
        tech_iot_desc: 'تصميم وتطوير أنظمة إنترنت الأشياء، ربط الأجهزة الذكية، وتحليل البيانات.',
        tech_cloud: 'الحوسبة السحابية',
        tech_cloud_desc: 'خدمات AWS، Azure، Google Cloud، وإدارة البنية التحتية السحابية.',
        tech_vr: 'الواقع الافتراضي والمعزز',
        tech_vr_desc: 'تطوير تطبيقات الواقع الافتراضي (VR) والواقع المعزز (AR) للألعاب والتعليم.',
        tech_3d: 'الطباعة ثلاثية الأبعاد',
        tech_3d_desc: 'التصميم والنمذجة ثلاثية الأبعاد، وتطبيقات الطباعة في الصناعة والطب.',
        tech_register: '📅 سجل الآن في دورات التكنولوجيا',
        it_title: 'تكنولوجيا المعلومات',
        it_desc_page: 'دورات ودعم فني متكامل في مجال تكنولوجيا المعلومات',
        it_services: 'خدمات تكنولوجيا المعلومات',
        it_services_desc: 'نقدم مجموعة شاملة من الخدمات والدورات في مجال IT لتلبية احتياجات الأفراد والشركات.',
        it_icdl: 'ICDL (الرخصة الدولية)',
        it_icdl_desc: 'دورات تحضيرية لامتحان الرخصة الدولية لقيادة الحاسوب بجميع وحداته.',
        it_db: 'إدارة قواعد البيانات',
        it_db_desc: 'دورات في SQL، Oracle، وMySQL لإدارة وتحليل البيانات بكفاءة.',
        it_programming: 'برمجة التطبيقات',
        it_programming_desc: 'تطوير تطبيقات الويب والموبايل بلغات برمجة حديثة (Python, Java, Swift).',
        it_support: 'الدعم الفني للشركات',
        it_support_desc: 'خدمات دعم فني متكاملة للشركات والمؤسسات لحل المشكلات التقنية.',
        it_register: '📅 سجل الآن في دورات IT',
        cyber_title: 'الأمن السيبراني',
        cyber_desc_page: 'دورات متخصصة في الأمن السيبراني لحماية الأنظمة والبيانات',
        cyber_programs: 'برامج الأمن السيبراني',
        cyber_programs_desc: 'نقدم دورات تدريبية احترافية في الأمن السيبراني تغطي الجوانب الهجومية والدفاعية.',
        cyber_network: 'أمن الشبكات',
        cyber_network_desc: 'تأمين البنية التحتية للشبكات، جدران الحماية، وأنظمة كشف التسلل.',
        cyber_pen: 'اختبار الاختراق',
        cyber_pen_desc: 'اختبار الاختراق الأخلاقي (Penetration Testing) وتقييم نقاط الضعف.',
        cyber_app: 'أمن التطبيقات',
        cyber_app_desc: 'تأمين التطبيقات والمواقع ضد الهجمات مثل SQL Injection و XSS.',
        cyber_response: 'الاستجابة للحوادث',
        cyber_response_desc: 'كيفية التعامل مع الحوادث الأمنية، تحليل الأدلة الرقمية، والاستجابة السريعة.',
        cyber_register: '📅 سجل الآن في دورة الأمن السيبراني',
        service_icdl_booking: 'دورة ICDL',
        service_support: 'دعم فني للشركات',
        service_cleaning: 'تنظيف أجهزة',
        service_other: 'خدمة أخرى',
        icdl_page_title: 'ICDL - الرخصة الدولية لقيادة الحاسوب',
        icdl_page_desc: 'دورة متكاملة لتعلم مهارات الحاسوب الأساسية والمعترف بها دولياً',
        icdl_about_title: '📖 عن دورة ICDL',
        icdl_about_desc: 'دورة ICDL (الرخصة الدولية لقيادة الحاسوب) هي دورة تدريبية متكاملة تهدف إلى تمكين الأفراد من اكتساب المهارات الأساسية في استخدام الحاسوب وتطبيقاته المختلفة. تعتبر هذه الشهادة معترف بها دولياً وتفتح آفاقاً واسعة في سوق العمل.',
        icdl_about_desc2: 'تغطي الدورة جميع الجوانب الأساسية لاستخدام الحاسوب، بدءاً من المفاهيم الأساسية وصولاً إلى المهارات المتقدمة في معالجة النصوص، جداول البيانات، العروض التقديمية، وقواعد البيانات.',
        icdl_modules_title: '📚 وحدات ICDL السبع',
        icdl_module1: 'الوحدة 1: مفاهيم تكنولوجيا المعلومات',
        icdl_module1_desc: 'تعريف الحاسوب، مكوناته الأساسية، أنواع البرامج، أنظمة التشغيل، وأساسيات الشبكات والإنترنت.',
        icdl_module2: 'الوحدة 2: استخدام الحاسوب وإدارة الملفات',
        icdl_module2_desc: 'استخدام سطح المكتب، إدارة الملفات والمجلدات، الضغط والفك، والبحث عن الملفات.',
        icdl_module3: 'الوحدة 3: معالجة النصوص (Word Processing)',
        icdl_module3_desc: 'إنشاء وتنسيق المستندات، إدراج الصور والجداول، التدقيق الإملائي، وطباعة المستندات باستخدام برنامج Microsoft Word.',
        icdl_module4: 'الوحدة 4: جداول البيانات (Spreadsheets)',
        icdl_module4_desc: 'إنشاء وتنسيق الجداول، استخدام الصيغ والدوال، إنشاء الرسوم البيانية، وتحليل البيانات باستخدام Microsoft Excel.',
        icdl_module5: 'الوحدة 5: قواعد البيانات (Databases)',
        icdl_module5_desc: 'مفاهيم قواعد البيانات، إنشاء الجداول والاستعلامات، إدخال البيانات، وإنشاء التقارير باستخدام Microsoft Access.',
        icdl_module6: 'الوحدة 6: العروض التقديمية (Presentations)',
        icdl_module6_desc: 'إنشاء وتنسيق العروض التقديمية، إدراج الصور والرسوم البيانية، إضافة التأثيرات، وتقديم العروض باستخدام Microsoft PowerPoint.',
        icdl_module7: 'الوحدة 7: مهارات الإنترنت والبريد الإلكتروني',
        icdl_module7_desc: 'استخدام متصفحات الإنترنت، البحث عن المعلومات، استخدام البريد الإلكتروني، وإدارة جهات الاتصال والمراسلات.',
        icdl_register: '📅 سجل الآن في دورة ICDL',
        icdl_cert_title: '🏅 مميزات شهادة ICDL',
        icdl_cert_li1: '✅ معترف بها دولياً في أكثر من 150 دولة.',
        icdl_cert_li2: '✅ تزيد من فرصك في الحصول على وظيفة.',
        icdl_cert_li3: '✅ تثبت كفاءتك في استخدام الحاسوب.',
        icdl_cert_li4: '✅ مطلوبة في معظم الوظائف الإدارية والمكتبية.',
        icdl_cert_li5: '✅ تمنحك ثقة أكبر في التعامل مع التكنولوجيا.',
        success_title: 'تم إرسال طلبك بنجاح!',
        success_desc: 'سوف نتواصل معك في أقرب وقت.'
    },
    en: {
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        booking: 'Booking',
        contact: 'Contact Us',
        settings: 'Settings',
        welcome_title: '🏛️ Welcome to',
        company_name: 'Andalus Scientific Technology',
        welcome_desc: 'We provide the latest technical and training solutions specialized in AI, Cybersecurity, Computer and Network Maintenance.',
        start_now: 'Start Now',
        hero_title: 'Welcome to Andalus Technology',
        hero_desc: 'A specialized technical center offering computer maintenance, networking, technical support, and training courses in AI, Cybersecurity, and IT.',
        book_now: 'Book Your Service Now',
        features_title: '🔹 Our Featured Services',
        service1_title: 'Computer Maintenance',
        service1_desc: 'Hardware and software maintenance, cleaning, and OS installation with highest quality.',
        service2_title: 'Networks',
        service2_desc: 'Network installation, comprehensive maintenance, and technical support for companies.',
        service3_title: 'Artificial Intelligence',
        service3_desc: 'Advanced training courses in AI and its practical applications.',
        service4_title: 'Cybersecurity',
        service4_desc: 'Professional training in cybersecurity and system/data protection.',
        service5_title: 'Information Technology',
        service5_desc: 'ICDL courses, IT, and integrated technical support for students and companies.',
        service6_title: 'Modern Technology',
        service6_desc: 'Keeping up with the latest technologies and their applications.',
        service7_title: 'ICDL (International License)',
        service7_desc: 'Preparation courses for the ICDL exam with all its modules.',
        go_to_page: 'Click to go to page ←',
        company_footer: 'Andalus Scientific Technology Company',
        all_rights: 'All Rights Reserved',
        settings_title: 'Settings',
        settings_desc: 'Customize your experience: Choose language, colors, and preferred mode',
        language: 'Language',
        language_desc: 'Choose the language to display the site',
        colors: 'Colors',
        colors_desc: 'Choose the primary color of the site',
        custom_color: 'Custom Color:',
        theme: 'Theme',
        theme_desc: 'Choose your preferred site mode',
        light_mode: 'Light',
        dark_mode: 'Dark',
        reset_settings: 'Reset Settings',
        about_title: 'About Us',
        about_desc: 'Learn about Andalus Scientific Technology Company, our vision and mission',
        about_company: 'About Andalus Scientific Technology Company',
        about_p1: 'Andalus Scientific Technology Company is a Jordanian company specialized in providing technical solutions and professional training, aiming to empower individuals and institutions to keep up with technological development and build practical skills that meet the requirements of the modern labor market.',
        about_p2: 'The company offers computer and network maintenance services, technical solutions, professional training, and technical consultations, in addition to a range of specialized courses in ICDL, Artificial Intelligence, Cybersecurity, and Computer and Network Maintenance.',
        about_p3: 'Andalus Scientific Technology seeks to provide training programs that combine theoretical and practical aspects under the supervision of qualified trainers, focusing on developing technical skills and raising the efficiency of trainees in line with the needs of the local and regional labor market.',
        vision: '🌟 Our Vision',
        vision_text: 'To be among the leading companies in training and technology in Jordan and the region, by providing high-quality technical and educational services that contribute to building a creative and qualified digital generation.',
        mission: '🎯 Our Mission',
        mission_text: 'Empowering individuals and institutions to benefit from the latest technologies and digital knowledge through practical training and distinguished technical services, contributing to sustainable professional and technological development.',
        values: '💎 Our Values',
        value1: 'Quality and professionalism.',
        value2: 'Innovation and continuous development.',
        value3: 'Credibility and transparency.',
        value4: 'Community service and dissemination of technical knowledge.',
        value5: 'Focus on practical application and actual results.',
        location: '📍 Our Location in Jordan:',
        location_desc: 'You can visit our headquarters at this geographic location',
        services_title: 'Services Page',
        services_desc: 'Everything you need to know about our technical and training services',
        service_hardware: '🖥️ Computer Maintenance (Hardware)',
        hardware_desc: 'We provide integrated computer maintenance services at the hardware level, including:',
        hardware_li1: 'Diagnosing hardware component failures (CPU, RAM, motherboard, power supply).',
        hardware_li2: 'Replacing and upgrading damaged components.',
        hardware_li3: 'Comprehensive internal cleaning of devices.',
        hardware_li4: 'Installing operating systems and basic software.',
        service_networks: '🌐 Network Installation and Connection',
        networks_desc: 'Specialized services in the field of networks:',
        networks_li1: 'Installing local area networks (LAN) and wide area networks (WAN).',
        networks_li2: 'Distributing access points to improve coverage.',
        networks_li3: 'Comprehensive maintenance of networks and fiber optic cables.',
        networks_li4: 'Server setup and network management.',
        service_ai: '🤖 Artificial Intelligence (AI)',
        ai_desc: 'Professional training courses in artificial intelligence:',
        ai_li1: 'Basics of artificial intelligence and machine learning.',
        ai_li2: 'Natural Language Processing (NLP).',
        ai_li3: 'Computer Vision.',
        ai_li4: 'AI applications in business.',
        service_tech: '📡 Modern Technology',
        tech_desc: 'We keep up with the latest global technologies:',
        tech_li1: 'Internet of Things (IoT).',
        tech_li2: 'Cloud Computing.',
        tech_li3: 'Virtual and Augmented Reality (VR/AR).',
        tech_li4: '3D Printing.',
        service_it: '💻 Information Technology (IT)',
        it_desc: 'Courses and support in IT:',
        it_li1: 'International Computer Driving License (ICDL).',
        it_li2: 'Database Management (SQL).',
        it_li3: 'Application and website programming.',
        it_li4: 'Technical support for companies and institutions.',
        service_cyber: '🔒 Cybersecurity',
        cyber_desc: 'Specialized courses in cybersecurity:',
        cyber_li1: 'Network and system security.',
        cyber_li2: 'Ethical Penetration Testing.',
        cyber_li3: 'Application and data security.',
        cyber_li4: 'Security incident response.',
        service_icdl: '📜 ICDL (International Computer Driving License)',
        icdl_desc: 'Integrated preparation courses for the ICDL exam, covering all basic modules:',
        icdl_li1: 'IT Fundamentals.',
        icdl_li2: 'Computers and Files Management.',
        icdl_li3: 'Word Processing.',
        icdl_li4: 'Spreadsheets.',
        icdl_li5: 'Databases.',
        icdl_li6: 'Presentations.',
        icdl_li7: 'Internet and Email Skills.',
        go_to_booking: 'Click to go to booking page ←',
        booking_title: 'Booking Page',
        booking_desc: 'Book your service or training course now with ease',
        booking_form_title: '📋 Booking Form',
        full_name: 'Full Name (4 words only) *',
        phone_number: 'Phone Number *',
        email_address: 'Email Address *',
        service_type: 'Service Type *',
        select_service: '-- Select Service --',
        preferred_date: 'Preferred Date (Month/Day only) *',
        preferred_time: 'Preferred Time (10:00 AM - 2:00 PM) *',
        select_time: '-- Select Time --',
        additional_notes: 'Additional Notes',
        confirm_booking: '✅ Confirm Booking',
        contact_title: 'Contact Us',
        contact_desc: 'We are here to serve you – contact us anytime',
        contact_info: '📌 Contact Information',
        address: '📍 Address:',
        jordan: 'Jordan',
        working_hours: '🕒 Working Hours:',
        working_hours_text: 'Saturday – Thursday 10:00 AM – 2:00 PM',
        view_map: 'View on Google Maps ←',
        send_message: '✉️ Send a Message',
        subject: 'Subject *',
        message: 'Message *',
        send_btn: '📤 Send Message',
        ai_title: 'Artificial Intelligence',
        ai_desc: 'Advanced training courses in AI and Machine Learning',
        ai_what: 'What We Offer in AI',
        ai_what_desc: 'We offer comprehensive training programs in AI covering theoretical and practical aspects, supervised by field experts.',
        ai_basics: 'AI Basics',
        ai_basics_desc: 'Basic concepts, history of AI, and its applications in daily life.',
        ai_ml: 'Machine Learning',
        ai_ml_desc: 'Supervised and unsupervised learning algorithms, regression and classification models.',
        ai_nlp: 'Natural Language Processing',
        ai_nlp_desc: 'Text analysis, machine translation, and building Chatbots.',
        ai_cv: 'Computer Vision',
        ai_cv_desc: 'Image and video processing, face and object recognition, and their applications.',
        ai_register: '📅 Register Now for AI Course',
        tech_title: 'Modern Technology',
        tech_desc_page: 'Keeping up with the latest global technologies and their practical applications',
        tech_fields: 'Fields of Modern Technology',
        tech_fields_desc: 'We offer courses and workshops in the latest technology fields to qualify you for the future job market.',
        tech_iot: 'Internet of Things (IoT)',
        tech_iot_desc: 'Design and development of IoT systems, connecting smart devices, and data analysis.',
        tech_cloud: 'Cloud Computing',
        tech_cloud_desc: 'AWS, Azure, Google Cloud services, and cloud infrastructure management.',
        tech_vr: 'Virtual and Augmented Reality',
        tech_vr_desc: 'Developing VR and AR applications for gaming and education.',
        tech_3d: '3D Printing',
        tech_3d_desc: '3D design and modeling, and printing applications in industry and medicine.',
        tech_register: '📅 Register Now for Technology Courses',
        it_title: 'Information Technology',
        it_desc_page: 'Courses and integrated technical support in IT',
        it_services: 'IT Services',
        it_services_desc: 'We offer a comprehensive range of IT services and courses to meet the needs of individuals and companies.',
        it_icdl: 'ICDL (International License)',
        it_icdl_desc: 'Preparation courses for the ICDL exam with all its modules.',
        it_db: 'Database Management',
        it_db_desc: 'Courses in SQL, Oracle, and MySQL for efficient data management and analysis.',
        it_programming: 'Application Programming',
        it_programming_desc: 'Web and mobile app development using modern programming languages (Python, Java, Swift).',
        it_support: 'Technical Support for Companies',
        it_support_desc: 'Integrated technical support services for companies and institutions to solve technical problems.',
        it_register: '📅 Register Now for IT Courses',
        cyber_title: 'Cybersecurity',
        cyber_desc_page: 'Specialized courses in cybersecurity to protect systems and data',
        cyber_programs: 'Cybersecurity Programs',
        cyber_programs_desc: 'We offer professional training courses in cybersecurity covering offensive and defensive aspects.',
        cyber_network: 'Network Security',
        cyber_network_desc: 'Securing network infrastructure, firewalls, and intrusion detection systems.',
        cyber_pen: 'Penetration Testing',
        cyber_pen_desc: 'Ethical penetration testing and vulnerability assessment.',
        cyber_app: 'Application Security',
        cyber_app_desc: 'Securing applications and websites against attacks like SQL Injection and XSS.',
        cyber_response: 'Incident Response',
        cyber_response_desc: 'How to handle security incidents, digital forensics analysis, and rapid response.',
        cyber_register: '📅 Register Now for Cybersecurity Course',
        service_icdl_booking: 'ICDL Course',
        service_support: 'Technical Support for Companies',
        service_cleaning: 'Device Cleaning',
        service_other: 'Other Service',
        icdl_page_title: 'ICDL - International Computer Driving License',
        icdl_page_desc: 'Comprehensive course to learn basic computer skills recognized internationally',
        icdl_about_title: '📖 About ICDL Course',
        icdl_about_desc: 'The ICDL (International Computer Driving License) course is an integrated training program designed to empower individuals with essential computer skills and various applications. This internationally recognized certificate opens wide opportunities in the job market.',
        icdl_about_desc2: 'The course covers all essential aspects of computer use, from basic concepts to advanced skills in word processing, spreadsheets, presentations, and databases.',
        icdl_modules_title: '📚 ICDL 7 Modules',
        icdl_module1: 'Module 1: IT Fundamentals',
        icdl_module1_desc: 'Computer definition, basic components, software types, operating systems, and networking and internet basics.',
        icdl_module2: 'Module 2: Computers and Files Management',
        icdl_module2_desc: 'Using the desktop, managing files and folders, compression and extraction, and file searching.',
        icdl_module3: 'Module 3: Word Processing',
        icdl_module3_desc: 'Creating and formatting documents, inserting images and tables, spell checking, and printing documents using Microsoft Word.',
        icdl_module4: 'Module 4: Spreadsheets',
        icdl_module4_desc: 'Creating and formatting tables, using formulas and functions, creating charts, and data analysis using Microsoft Excel.',
        icdl_module5: 'Module 5: Databases',
        icdl_module5_desc: 'Database concepts, creating tables and queries, data entry, and generating reports using Microsoft Access.',
        icdl_module6: 'Module 6: Presentations',
        icdl_module6_desc: 'Creating and formatting presentations, inserting images and charts, adding effects, and delivering presentations using Microsoft PowerPoint.',
        icdl_module7: 'Module 7: Internet and Email Skills',
        icdl_module7_desc: 'Using web browsers, searching for information, using email, and managing contacts and correspondence.',
        icdl_register: '📅 Register Now for ICDL Course',
        icdl_cert_title: '🏅 ICDL Certificate Benefits',
        icdl_cert_li1: '✅ Recognized internationally in over 150 countries.',
        icdl_cert_li2: '✅ Increases your chances of getting a job.',
        icdl_cert_li3: '✅ Proves your computer proficiency.',
        icdl_cert_li4: '✅ Required in most administrative and office jobs.',
        icdl_cert_li5: '✅ Gives you greater confidence in dealing with technology.',
        success_title: 'Your request has been sent successfully!',
        success_desc: 'We will contact you as soon as possible.'
    }
};

function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
    applyLogo(lang);
    updateActiveButton('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-trans]');
    elements.forEach(el => {
        const key = el.getAttribute('data-trans');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

function applyLogo(lang) {
    const logoAr = document.querySelectorAll('.logo-ar');
    const logoEn = document.querySelectorAll('.logo-en');

    if (lang === 'en') {
        logoAr.forEach(el => el.style.display = 'none');
        logoEn.forEach(el => el.style.display = 'block');
    } else {
        logoAr.forEach(el => el.style.display = 'block');
        logoEn.forEach(el => el.style.display = 'none');
    }
}

function setColor(color) {
    localStorage.setItem('primaryColor', color);
    applyColor(color);
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.style.background === color) {
            btn.classList.add('active');
        }
    });
}

function applyColor(color) {
    document.documentElement.style.setProperty('--primary', color);
    const lightColor = color + '33';
    document.documentElement.style.setProperty('--primary-light', lightColor);
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    updateActiveButton('theme', theme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function updateActiveButton(type, value) {
    if (type === 'lang') {
        document.querySelectorAll('#langAr, #langEn').forEach(btn => btn.classList.remove('active'));
        const btn = document.getElementById(value === 'ar' ? 'langAr' : 'langEn');
        if (btn) btn.classList.add('active');
    } else if (type === 'theme') {
        document.querySelectorAll('#themeLight, #themeDark').forEach(btn => btn.classList.remove('active'));
        const btn = document.getElementById(value === 'light' ? 'themeLight' : 'themeDark');
        if (btn) btn.classList.add('active');
    }
}

function loadSettings() {
    const lang = localStorage.getItem('preferredLanguage') || 'ar';
    applyLanguage(lang);
    applyLogo(lang);
    updateActiveButton('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const color = localStorage.getItem('primaryColor') || '#0a2b4e';
    applyColor(color);

    const theme = localStorage.getItem('theme') || 'light';
    applyTheme(theme);
    updateActiveButton('theme', theme);
}

function resetSettings() {
    localStorage.removeItem('preferredLanguage');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('theme');
    localStorage.removeItem('welcomeShown');
    location.reload();
}

window.setLanguage = setLanguage;
window.setColor = setColor;
window.setTheme = setTheme;
window.resetSettings = resetSettings;
