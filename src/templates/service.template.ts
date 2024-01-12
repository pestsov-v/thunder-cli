import { injectable } from '@Packages';
import type { IServiceTemplate } from '@Cli/Types';

@injectable()
export class ServiceTemplate implements IServiceTemplate {
  public getServiceServerEntry(service: string): string {
    return `export * from './services/${service}/${service}.server.entry'`;
  }

  public getServiceWebClientEntry(service: string): string {
    return `export * from './services/${service}/${service}.web-client.entry'`;
  }

  public getServiceServer(service: string): string {
    return `import {setService} from "@chaminjector/server";
import {ServiceName} from "../../services";

export const ${service}Service = setService(ServiceName.${service}, []);`;
  }

  public getServiceWebClient(service: string): string {
    return `import {setService} from "@chaminjector/web-client";
import {ServiceName} from "../../services";

export const ${service}Service = setService(ServiceName.${service}, [], {});`;
  }

  public getServices(service: string): string {
    return `export const ServiceName = {
  ${service}: '${service}',
} as const;`;
  }

  public get pagesApp(): string {
    return `import './globals.css';
import React from 'react';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
`;
  }

  public get pagesDocument(): string {
    return `import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
  }

  public get pagesHome(): string {
    return `import React from 'react';
import type { GetServerSideProps } from 'next';

export type HomeProps = {
  title: string;
  content: string;
};

export default function Home(props: HomeProps): React.JSX.Element {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.content}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{ props: HomeProps }> => {
  return {
    props: {
      title: 'Hello world',
      content: 'That is the first content of best site.',
    },
  };
};`;
  }
}
