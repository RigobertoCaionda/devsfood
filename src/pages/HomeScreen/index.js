import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {
    Container, 
    CategoryArea, 
    CategoryList,
    ProductArea, 
    ProductList,
    ProductPaginationArea,
    ProductPaginationItem
        } from './styled';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import Modal from '../../components/Modal';
import ModalProduct from '../../components/ModalProduct';
import ReactTooltip from 'react-tooltip';
import api from '../../api';
let searchTimer = null;//Para poder parar o timer
export default () => {
    //Array(totalPages).fill(0) e para preencher o array com totalPages posicoes, o valor dele e o fill
      const history = useHistory();
    const [headerSearch, setHeaderSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);//total de paginas
    const [activePage, setActivePage] = useState(1);//pagina atual
    const [activeSearch, setActiveSearch] = useState('');//Vai nos ajudar a fazer a pesquisa, monitorando o headerSearch
    const [activeCategory, setActiveCategory] = useState(0);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState({});//Informacoes que vamos mandar para o modal
    const getProducts = async () => {
        const prods = await api.getProducts(activeCategory, activePage, activeSearch);
        if (prods.error === '') {
            setProducts(prods.result.data);
            setTotalPages(prods.result.pages);//O back end ja te retorna quantas paginas sao...
            setActivePage(prods.result.page);
        }
    }
    useEffect(()=>{
        const getCategories = async () => {
            const cat = await api.getCategories();
            if (cat.error === '') {
                setCategories(cat.result);
            }
            ReactTooltip.rebuild();//Para fazer funcionar aqueles que sao carregados via API
        };
        getCategories();
    },[]);

    useEffect(()=>{
        clearTimeout(searchTimer);//Parar o timer anterior (se tiver)
        searchTimer = setTimeout(()=>{
                setActiveSearch(headerSearch);
        },2000);
    },[headerSearch]);

    useEffect(()=>{
        setProducts([]);
        getProducts();
    },[activeCategory, activePage, activeSearch]);//Colocamos o activeSearch em vez do headerSearch justamente para evitar que ele faca a requisicao a cada letra digitada
    
    const handleProductClick = (data) => {
        setModalData(data);
        setModalStatus(true);
    }

    return (
        <Container>
           <Header search={headerSearch} onSearch={setHeaderSearch}/>

           {categories.length > 0 &&
                    <CategoryArea>
                        Selecione uma categoria
                        <CategoryList>
                            <CategoryItem data={{id: 0, name: 'Todas as categorias', 
                            image: '/assets/food-and-restaurant.png'}} activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}/>
                            {categories.map((item, index)=>(
                                    <CategoryItem key={index} data={item} activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}/>
                                ))}
                        </CategoryList>
                    </CategoryArea>
           }
           {products.length > 0 &&
               <ProductArea>
                    <ProductList>
                        {products.map((item, index)=>(
                                <ProductItem key={index} data={item}
                                onClick={handleProductClick}/>
                            ))}
                    </ProductList>
               </ProductArea>
        }
        {totalPages > 0 &&
            <ProductPaginationArea>
                {Array(totalPages).fill(0).map((item, index)=>(//nao da para dar um map em totalPages por nao ser um array
                        <ProductPaginationItem key={index} active={activePage} current={index + 1}
                        onClick={()=>setActivePage(index + 1)}>
                            {index + 1}
                        </ProductPaginationItem>
                    ))}
            </ProductPaginationArea>
        }

        <Modal status={modalStatus} setStatus={setModalStatus}>
           <ModalProduct data={modalData} setStatus={setModalStatus} />
        </Modal>
        </Container>
    );
}