import Image from 'next/image'

// NOTE: if we create a components folder inside app to keep the components, 
// the folder will not be treated as a route like /about becuse the folder does not have a page.js in it.

export default function Header() {
        return (
                <>
                        <Image src="/icon.png"
                                width={500}
                                height={500}
                                alt="A server surrounded by magic sparkles."
                        />
                        <h1>Welcome to this NextJS Course!</h1>
                </>
        );
}