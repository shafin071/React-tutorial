import logo from '../../assets/logo.png';


export default function Header() {
        return (
                // NOTE: md:mb-16 is a media query CSS. 
                // It means when screen size is md (768px), apply mb-16 (margin-bottom: 4em or 176px)
                // Apply mt-8 mb-8 for all other screen sizes
                <header className="flex flex-col items-center mt-8 mb-8 md:mb-16">
                        <img src={logo} alt="A canvas" className="mb-8 w-44 h-44" />
                        {/* font-title class below is a custom class */}
                        {/* NOTE: when writing classNames, use "" instead of '' for Tailwind Intellisense Plugin to work */}
                        <h1 className="text-4xl md:text-4xl font-semibold tracking-widest text-center uppercase text-amber-800 font-title">
                                ReactArt
                        </h1>
                        <p className="text-stone-500">A community of artists and art-lovers.</p>
                </header>
        );
}
