window.onload = ()=>{
    let allPubs = data.publications;
    let filter = document.querySelector('.selected');
    // let filter = document.getElementsByClassName('selected');
    console.log('filter');
    console.log(filter);
    // let dataCond = filter.getAttribute('data-cond');
    let dataCond = filter.dataset.cond;
    renderPubs(allPubs, dataCond);
    function renderPubs(pubs,cond){
        let filtered;
        switch(cond){
            case 'pub-all': 
            filtered = pubs;
            break;
            case 'pub-featured':
            filtered = pubs.filter(item=>item.featured=='yes');
            break;
            case 'pub-awards':
            filtered = pubs.filter(item=>item.award!='');
            break;
            case 'pub-journal':
            filtered = pubs.filter(item=>item.type.toLowerCase()=='journal');
            break;
            case 'pub-conference':
            filtered = pubs.filter(item=>item.type.toLowerCase()=='conference');
            break;
            default:
            filtered = pubs;
        }
        // filter by type
        // let byType = document.querySelector('#by-time');
        // console.log('render', filtered, cond);
        // if (byType.checked){
        //     filtered = d3.nest()
        //     .key(item=>item.year)
        //     .sortValues((a,b)=>b.title.localeCompare(a.title))
        //     .entries(filtered);
        //     filtered.sort((a,b)=>b.key-a.key)
        // }else{
        //     filtered = d3.nest()
        //     .key(item=>item.type)
        //     .sortValues((a,b)=>parseInt(b.year)-parseInt(a.year))
        //     .entries(filtered);
        // }

        // let container = document.querySelector('.pubs');
        let container = document.getElementById('pubs');
        console.log('container');
        console.log(container);
        container.innerHTML='';

        var last_year=0;

        filtered.forEach((d,i) =>{
            // console.log('item',group);
            //website,slides,video,code,data,software,supplemental,media,abstract
        
            // let html = group.values.reduce((html, d)=>{
                // let path = `assets/files/publications/${d.type.toLowerCase()}/${d.title.replace(/\s/g, '-').replace(/:/g, '').toLowerCase()}`;
                let path = `assets/pubs/${d.folder}`;
                let html = `<div class='pub'>
                    <div class='pub-teaser'
                        style='background-image:url(${path}/teaser.png);'>
                    </div>
                    <div class='pub-detail'>
                        <div class='pub-title'><strong>${d.title}</strong></div>
                        <div class='pub-authors'>${d.authors.replace('Yang Shi', '<strong>Yang Shi</strong>')}</div>
                        <div class='pub-publisher'>${d.publisher}</div>
                        <div class='pub-materials'>
                            ${renderPubMaterials(d.materials, path)}
                        </div>

                    </div>
                </div>`;
            // }, '');
            let elem = document.createElement('div');
            if(d.year!=last_year){
                elem.innerHTML = `<div class='heading-year'>${d.year}</div>` + html;
            }
            else{
                elem.innerHTML = html;
            }
            last_year = d.year;
            elem.classList.add('pub-group');
            console.log('container');
            console.log(container);
            console.log('elem');
            console.log(elem);
            container.appendChild(elem);
        });

    function renderPubMaterials(d, path){
        // let path = `/files/publications/${group.key.toLowerCase()}/${d.title.replace(/\s/g, '-').replace(/:/g, '').toLowerCase()}`;
        let generate = (icon, link, label)=>`<div class='item'>
            <i class="${icon}"></i>
            <a href='${link}' target='_blank'>${label}</a>
        </div>`
        let html = generate('far fa-file-alt', `${path}/paper.pdf`, 'Paper');
        // if (d.website!=''){
        //     html+= generate('fas fa-globe', d.website, 'WEBSITE');
        // }
        // if (d.supplement=='yes'){
        //     html+= generate('far fa-file-alt', `${path}/supplement.pdf`, 'SUPPLEMENT');
        // } else if (d.supplement=='zip'){
        //     html+= generate('far fa-file-alt', `${path}/supplement.zip`, 'SUPPLEMENT');
        // }
        // if (d.slides=='yes'){
        //     html+= generate('fas fa-chalkboard-teacher', `${path}/slides.pdf`, 'SLIDES');
        // }else if (d.slides.startsWith('http')){
        //     html+= generate('far fa-file-alt', d.slides, 'SLIDES');
        // }
        // if (d.data!=''){
        //     html+= generate('fas fa-database', d.data, 'DATA');
        // }

        // if (d.code!=''){
        //     html+= generate('fas fa-code', d.code, 'CODE');
        // }
        if (d.video!=undefined){
            // html+= generate('fas fa-video', d.video.startsWith('http')?d.video:`${path}/video.mp4`, 'VIDEO');
            html += "|&nbsp;&nbsp;"
            html += generate('fas fa-video', `${path}/video.mp4`, 'Video');
        }
        // if (d.software!=''){
        //     html+= generate('fas fa-desktop', d.software, 'SOFTWARE');
        // }

        return html;
        // slides, video, code, data, software, supplemental, abstract

        }

        let conds = document.querySelectorAll('.filter .chip');

        conds.forEach(cond=>cond.addEventListener('click', function(event){
        if (this.classList.contains('selected')==false){
            let selected = document.querySelector('.chip.selected');
            selected.classList.remove('selected');
            this.classList.add('selected');   
            console.log('filter', this.dataset.cond);
            dataCond = this.dataset.cond;
            renderPubs(allPubs, dataCond);
        }
    }));
    }
}
