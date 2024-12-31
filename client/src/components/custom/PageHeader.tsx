const PageHeader = ({title, subtitle}: {title: string, subtitle: string}) => {
    return(
        <div className="p-4 h-36 flex items-center">
            <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-xl font-medium text-slate-700/90">{subtitle}</p>
            </div>
        </div>
    )
};

export default PageHeader;