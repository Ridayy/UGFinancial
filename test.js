        <script type="module">
            import * as prismic from "https://cdn.skypack.dev/@prismicio/client";
            import * as prismicH from "https://cdn.skypack.dev/@prismicio/helpers";
            const repoName = "ugfinancial";
            const endpoint = prismic.getEndpoint(repoName);
            const client = prismic.createClient(endpoint);
            const init = async () => {
               const homeDoc = await client.getSingle("home");
               const prismicDoc = await client.getSingle("about");
               setLogo(homeDoc);
               setShowcase(prismicDoc);
               setAboutA(prismicDoc);
               setAboutB(prismicDoc);
               setFooter(homeDoc);
            };

            function setShowcase(prismicDoc){
               const { showcase_title, showcase_content, showcase_btn_link, showcase_btn_text, showcase_image} = prismicDoc.data;
               const titleHTML = prismicH.asHTML(showcase_title);

               const showcase = document.querySelector('#showcase');
               const showcaseContent = document.querySelector(".showcase-content");
               const mainHeading =  showcaseContent.children[0];
               const leadParagraph = showcaseContent.children[1];
               const linkText = showcaseContent.children[2];

               mainHeading.innerHTML = titleHTML;
               leadParagraph.textContent = showcase_content[0].text.trim();
               linkText.textContent = showcase_btn_text[0].text.trim();
               linkText.setAttribute('href', showcase_btn_link[0].spans[0].data.url);
               showcase.setAttribute('style', `background-image: url('${showcase_image.url}') !important`);

               $( ".loader").fadeOut();
            }

       
            
            function setLogo(prismicDoc){
               const { logo } = prismicDoc.data;
               const navbarBrand = document.querySelector(".navbar-brand");
               const navbarLogo = navbarBrand.children[0];
               navbarLogo.setAttribute('src', `${logo.url}`);
            }

            function setFooter(prismicDoc){
            
               const footerA = document.querySelector(".footer-a");
               const { logo , footer_a_description } = prismicDoc.data.body[7].primary;

               const footerLogo = footerA.children[0];
               const descriptionA = footerA.children[1];

               footerLogo.innerHTML = ` <img src="${logo.url}" alt="${logo.alt}" />`;
               descriptionA.textContent = footer_a_description[0].text.trim();

               // PART B
               const footerB = document.querySelector(".footer-b");
               const { footer_b_heading } = prismicDoc.data.body[8].primary;

               const footerBHeading = footerB.children[0];
               const footerBLinksDiv = footerB.children[1];

               footerBHeading.textContent = footer_b_heading[0].text.trim();

               let footerBLinks = "";
               let linkItems = prismicDoc.data.body[8].items;
               linkItems.forEach(link => {
               const {footer_b_link, footer_b_link_text} = link;
               const l = footer_b_link[0].spans[0].data.url;
               const t = footer_b_link_text[0].text;
               footerBLinks += `<a href="${l}">${t}</a><br>`;
               });
               let div = document.createElement("div");
               div.innerHTML = footerBLinks;
               footerB.replaceChild(div, footerBLinksDiv);


               // PART C
               const footerC = document.querySelector(".footer-c");
               const { footer_c_heading } = prismicDoc.data.body[9].primary;

               const footerCHeading = footerC.children[0];
               const footerCLinksDiv = footerC.children[1];

               footerCHeading.textContent = footer_c_heading[0].text.trim();

               let footerCLinks = "";
               linkItems = prismicDoc.data.body[9].items;
               linkItems.forEach(link => {
               const {footer_c_link, footer_c_link_text} = link;
               const l = footer_c_link[0].spans[0].data.url;
               const t = footer_c_link_text[0].text;
               footerCLinks += `<a href="${l}">${t}</a><br>`;
               });
               div = document.createElement("div");
               div.innerHTML = footerCLinks;
               footerC.replaceChild(div, footerCLinksDiv);

               //  PART D
               const footerD = document.querySelector(".footer-d");
               const {footer_d_heading, footer_d_description, email, twitter_link, instagram_link, facebook_link } = prismicDoc.data.body[10].primary;

               console.log(twitter_link);

               const footerDHeading = footerD.children[0];
               const descriptionD = footerD.children[1];
               const footerDLink = footerD.children[2];
               const socialLinks = footerD.children[3];

               footerDHeading.textContent = footer_d_heading[0].text;
               descriptionD.textContent = footer_d_description[0].text.trim();

               const em = email[0].text;

               footerDLink.innerHTML = `<a href="mailto:${em}">${em}</a>`;

               socialLinks.children[0].setAttribute('href', `${facebook_link[0].spans[0].data.url}`);
               socialLinks.children[1].setAttribute('href', `${twitter_link[0].spans[0].data.url}`);
               socialLinks.children[2].setAttribute('href', `${instagram_link[0].spans[0].data.url}`);
            }
            init();
      </script>