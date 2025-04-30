function generateElements(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.children;
  }

let Vvveb = {
    baseUrl: "./",
    ComponentsGroup: {},
    imgBaseUrl: function() { return this.baseUrl + "images"; },
    iconBaseUrl: function() { return this.baseUrl + "libs/builder/icons"; },
    // Methods
    init: function() {
        //Execute Methods that you need run on intializing this object
        this.loadControlGroups();
    },
    loadControlGroups: function () {
        let componentsList = document.querySelectorAll(".components-list");
        let item = {},
          component = {};
        let count = 0;
    
        componentsList.forEach(function (list, i) {
          let type = list.dataset.type;
          list.replaceChildren();
          count++;
    
          for (group in Vvveb.ComponentsGroup) {
            list.append(
              generateElements(
                `<li class="header" data-section="${group}"  data-search="">
                        <label class="header" for="${type}_comphead_${group}${count}">
                            ${group}<div class="header-arrow"></div>
                        </label>
                        <input class="header_check" type="checkbox" checked="true" id="${type}_comphead_${group}${count}">
                        <ol></ol>
                    </li>`
              )[0]
            );
            let componentsSubList = list.querySelector(
              'li[data-section="' + group + '"]  ol'
            );
    
            components = Vvveb.ComponentsGroup[group];
    
            for (i in components) {
              componentType = components[i];
              component = Vvveb.Components.get(componentType);
    
              if (component) {
                item =
                  generateElements(`<li data-section="${group}" data-drag-type="component" data-type="${componentType}" data-search="${component.name.toLowerCase()}">
                                <span>${component.name}</span>
                            </li>`)[0];
    
                if (component.image) {
                  item.style.backgroundImage =
                    "url(" + Vvveb.imgBaseUrl() + component.image + ")";
                  item.style.backgroundRepeat = "no-repeat";
                }
                else if (component.icon) {
                    item.style.backgroundImage =
                    "url(" + Vvveb.iconBaseUrl() + component.icon + ")";
                  item.style.backgroundRepeat = "no-repeat";
                }
    
                componentsSubList.append(item);
              }
            }
          }
        });
    },
    loadSectionGroups: function () {
        let sectionsList = document.querySelectorAll(".sections-list");
        let item = {};
    
        sectionsList.forEach(function (list, i) {
          let type = list.dataset.type;
          list.replaceChildren();
    
          for (group in Vvveb.SectionsGroup) {
            list.append(
              generateElements(
                `<li class="header" data-section="${group}"  data-search="">
                        <label class="header" for="${type}_sectionhead_${group}">
                            ${group}<div class="header-arrow"></div>
                        </label>
                        <input class="header_check" type="checkbox" checked="true" id="${type}_sectionhead_${group}">
                        <ol></ol>
                    </li>`
              )[0]
            );
    
            let sectionsSubList = list.querySelector(
              'li[data-section="' + group + '"]  ol'
            );
            sections = Vvveb.SectionsGroup[group];
    
            for (i in sections) {
              sectionType = sections[i];
              section = Vvveb.Sections.get(sectionType);
    
              if (section) {
                item =
                  generateElements(`<li data-section="${group}" data-drag-type="section" data-type="${sectionType}" data-search="${section.name.toLowerCase()}">
                                        <span class="name">${section.name}</span>
                                        <div class="add-section-btn" title="Add section"><i class="la la-plus"></i></div>
                                        <img class="preview" src="" loading="lazy">
                                    </li>`)[0];
    
                if (section.image) {
                  let image =
                    (section.image.indexOf("/") == -1 ? Vvveb.imgBaseUrl : "") +
                    section.image;
                  item.querySelector("img").setAttribute("src", image);
                }
    
                sectionsSubList.append(item);
              }
            }
          }
        });
    },
    loadBlockGroups: function () {
        let blocksList = document.querySelectorAll(".blocks-list");
        let item = {};
    
        blocksList.forEach(function (list, i) {
          let type = list.dataset.type;
          list.replaceChildren();
    
          for (group in Vvveb.BlocksGroup) {
            list.append(
              generateElements(
                `<li class="header" data-section="${group}"  data-search="">
                        <label class="header" for="${type}_blockhead_${group}">
                            ${group}<div class="header-arrow"></div>
                        </label>
                        <input class="header_check" type="checkbox" checked="true" id="${type}_blockhead_${group}">
                        <ol></ol>
                    </li>`
              )[0]
            );
    
            let blocksSubList = list.querySelector(
              'li[data-section="' + group + '"]  ol'
            );
            blocks = Vvveb.BlocksGroup[group];
    
            for (i in blocks) {
              blockType = blocks[i];
              block = Vvveb.Blocks.get(blockType);
    
              if (block) {
                item =
                  generateElements(`<li data-section="${group}" data-drag-type="block" data-type="${blockType}" data-search="${block.name.toLowerCase()}">
                                        <span class="name">${block.name}</span>
                                        <img class="preview" src="" loading="lazy">
                                    </li>`)[0];
    
                if (block.image) {
                  let image =
                    (block.image.indexOf("/") == -1 ? Vvveb.imgBaseUrl : "") +
                    block.image;
                  item.querySelector("img").setAttribute("src", image);
                }
    
                blocksSubList.append(item);
              }
            }
          }
        });
    },

}

Vvveb.Components = {
    // Properties
    _components: {},
    _nodesLookup:{},
    _attributesLookup:{},
    _attribuesLookup: {},
    _classesLookup: {},
    _classesRegexLooup: {},
    _componentPropertiesElement: "",
    _componentpropertiesDefaultSection: "",

    // Methods
    get: function(type) {
        return this._components[type];
    },
    getProperty: function (type, key) {
        let properties = this._components[type]
          ? this._components[type]["properties"]
          : [];
        for (property in properties) {
          if (key == properties[property]["key"]) {
            return properties[property];
          }
        }
    },
    updateProperty: function(type, key, value){
        let properties = this._components[type]["properties"];
        for (property in properties) {
          if (key == properties[property]["key"]) {
            return (this._components[type]["properties"][property] = Object.assign(
              properties[property],
              value
            ));
          }
        }
    },
    extendProperties: function(type, data){
        if(typeof this._components[type] !== "undefined"){
            let properties = this._components[type]["properties"];
            if(data === undefined 
                || typeof data === undefined 
                || data === "" 
                || (Array.isArray(data) && data.length === 0)){
                return properties;
            }
            if(Array.isArray(properties)){
                for(let [key, property] of Object.entries(data)){
                    if(typeof property['key'] !== "undefined"){
                        for(let [inheritKey, inheritProperty] of Object.entries(properties)){
                            if(typeof inheritProperty['key'] !== "undefined" &&
                                property['key'] == inheritProperty['key'])
                            {
                                data[key] = {
                                    ...inheritProperty,
                                    ...property
                                }
                                properties.splice(inheritKey, 1);
                            }
                        }
                    }
                }
                return properties.concat(data);
            }
        }
        return data;
    },
    add: function(type, data){
        data.type = type;
        this._components[type] = data;
        console.log(this._components);
    }, 
    extend: function(inheritType, type, data){
        let newData = data;
        if((inheritData = this._components[inheritType])){
           for(let key in inheritData){
            if(key == "properties"){
                let props = this.extendProperties(inheritType, data[key]);
                newData[key] = props;
            }else{
                if(typeof newData[key] !== "undefined"){
                    if(Array.isArray(inheritData[key])){
                        newData[key] = inheritData[key].concat(data[key]);
                    }
                    else if(typeof inheritData[key] === 'object'){
                        newData[key] = {...inheritData[key], ...data[key]};
                    }
                    else{
                        newData[key] = inheritData[key];
                    }
                }else{
                    newData[key] = inheritData[key];
                }
            }
        
           }
        }
        this.add(type, newData);
    },
    matchNode: function() {

    },
    render: function() {

    }
};

//Add 5 Simple components
let base_sort = 1;

Vvveb.Components.add("_base", {
    name: "Element",
	properties: [{
        key: "element_header",
        name:false,
        sort:base_sort++,
        data: {header:"General"}
    },{
        name: "Id",
        key: "id",
        htmlAttr: "id",
        sort: base_sort++,
        inline:false,
        col:6
    },{
        name: "Class",
        key: "class",
        htmlAttr: "class",
        sort: base_sort++,
        inline:false,
        col:6
    },
    {
        key: "display_header",
        name:false,
        sort: base_sort++,
		section: {},
        data: {header:"Display"},
     }
   ],
   items: [{
    id: 1,
    name: "Mango"
   }],
   obj: {
    name: "Book"
   }
});

Vvveb.Components.extend("_base", "_base", {
	 properties: [{
        key: "display_header",
        product: "Chair"
     }],
     items: [{
        id: 2,
        name: "Apple"
       }],
       obj: {
        price: 100
       }
});

Vvveb.Components.extend("_base", "html/p", {
    icon: "/paragraph.svg",
    name: "Paragraph",
    html: /*html*/ `<p>This is a paragraph</p>`,
});
Vvveb.Components.extend("_base", "html/h", {
    icon: "/heading.svg",
    name: "Heading",
    html: /*html*/ `<h1>This is a heading</h1>`,
});

Vvveb.ComponentsGroup['Base'] = [
    "html/p",
    "html/h"
];

Vvveb.init();