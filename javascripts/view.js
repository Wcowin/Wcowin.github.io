(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'G-29HZMNR0KG', 'auto');
    ga('send', 'pageview');
    
    async function getViews() {
        let data = await ga.getAll()[0].get('page');
        return data.pageviews;
    }
    
    async function renderViews() {
        let views = await getViews();
        let elem = document.getElementById("views");
        if (elem) {
            elem.innerText = views;
        }
    }
    
    renderViews();