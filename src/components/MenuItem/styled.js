import styled from 'styled-components';
export const LinkArea = styled.a`
	width: 60px;
	height: 60px;
	background-color: ${props=>props.active ? '#0b4d0b' : 'transparent'};
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
`;
export const LinkIcon = styled.img`
	width: 34px;
	height: auto;
`;